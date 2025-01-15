"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationPage = exports.omitShard = exports.getNextPage = exports.queryParameters = exports.nextLink = exports.getPage = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const FIRST_PAGE = 1;
const PAGE_SIZE = 10;
const PAGE_QUERY_PARAM = "page";
const SHARD_QUERY_PARAM = "shard";
const DEFAULT_SHARD = 0;
function parseOptionalInt(value) {
    return value ? parseInt(value, 10) : undefined;
}
function urlWithoutQueryParameters(request) {
    const protocolAndHost = `${request.protocol}://${request.get("Host")}`;
    const pathname = new URL(`${protocolAndHost}${request.originalUrl}`).pathname;
    return `${protocolAndHost}${pathname}`;
}
function getPage(pageNum, shard) {
    return { num: pageNum ? pageNum : FIRST_PAGE, size: PAGE_SIZE, shard };
}
exports.getPage = getPage;
function nextLink(parameters) {
    const { nextPage, request } = parameters;
    return nextPage
        ? `${urlWithoutQueryParameters(request)}?${PAGE_QUERY_PARAM}=${nextPage.num}${nextPage.shard ? `&${SHARD_QUERY_PARAM}=${nextPage.shard}` : ""}`
        : undefined;
}
exports.nextLink = nextLink;
function queryParameters(parameters) {
    const { page } = parameters;
    return {
        take: page.size,
        skip: page.num * page.size,
        where: { shard: page.shard ?? DEFAULT_SHARD },
    };
}
exports.queryParameters = queryParameters;
async function countOnPage(page, collection) {
    return collection.count(queryParameters({ page }));
}
async function getNextPage(parameters) {
    const { currentPage, collection } = parameters;
    const nextPageNum = currentPage.num + 1;
    const nextPageInShard = getPage(nextPageNum, currentPage.shard);
    const countRemainingInShard = await countOnPage(nextPageInShard, collection);
    if (countRemainingInShard > 0) {
        return nextPageInShard;
    }
    const nextShard = (currentPage.shard ?? DEFAULT_SHARD) + 1;
    if (nextShard > constants_1.MAX_SHARDS) {
        return undefined;
    }
    const pageInNextShard = getPage(FIRST_PAGE, nextShard);
    const countInNextShard = await countOnPage(pageInNextShard, collection);
    if (countInNextShard > 0) {
        return pageInNextShard;
    }
    return undefined;
}
exports.getNextPage = getNextPage;
function omitShard(obj) {
    const { shard: _, ...rest } = obj;
    return rest;
}
exports.omitShard = omitShard;
exports.PaginationPage = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const page = parseOptionalInt(request.query[PAGE_QUERY_PARAM]);
    const shard = parseOptionalInt(request.query[SHARD_QUERY_PARAM]);
    return getPage(page, shard);
});
//# sourceMappingURL=pagination.js.map