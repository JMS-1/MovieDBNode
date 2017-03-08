import * as protocol from './protocol';

export function getInfo(): protocol.ApplicationInformation {
    return {
        total: 0,
        genres: [],
        series: [],
        empty: false,
        languages: [],
        containers: [],
        seriesSeparator: ">",
        urlExpression: "https?:\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?"
    };
}