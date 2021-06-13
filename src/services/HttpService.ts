import _ from 'lodash';
export default class HttpService {

    static fetch = async (url: string, init: RequestInit, expectJson: boolean) => {
        try {
            const res = await fetch(HttpService.getProperUrl(url), HttpService.processInit(init))
            if(res.ok) {
                return expectJson ? await res.json(): await res.text()
            } else {
                const error = await res.json()
                throw error
            }
        } catch (ex) {
            throw _.merge({message: "Error while requesting"}, ex)
        }
    }

    static getProperUrl = (url: string) => {
        const formattedUrl = url.startsWith("/") ? url: ("/" + url)
        const prefix = process.env.NODE_ENV === "development" ? "http://localhost:8080": ""
        return prefix + formattedUrl
    }

    static processHeaders = (headers: any) => {
        if(!HttpService.doesHeaderHaveContentType(headers)) {
            return _.merge({}, headers, {'Content-Type': 'application/json'})
        }
        return headers
    }
    static processInit = (init: RequestInit): RequestInit => {
        const clonedInit = _.cloneDeep(init)
        if(clonedInit && clonedInit.headers) {
            clonedInit.headers = HttpService.processHeaders(clonedInit.headers)
        }
        return clonedInit
    }

    static doesHeaderHaveContentType = (headers: any) => {
        return Boolean(_.get(headers, 'Content-Type', null))
    }

    static get = async (url: string, headers: any, expectJson: boolean) => {
        return await HttpService.fetch(url, {
            method: 'GET',
            headers: headers,
        }, expectJson);
    }
    static post = async (url: string, headers: any, bodyData: any, expectJson: boolean) => {
        return await HttpService.fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(bodyData)
        }, expectJson);
    }
    static put = async (url: string, headers: any, bodyData: any, expectJson: boolean) => {
        return await HttpService.fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(bodyData)
        }, expectJson);
    }
    static deleteReq = async (url: string, headers: any, bodyData: any, expectJson: boolean) => {
        return await HttpService.fetch(url, {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(bodyData)
        }, expectJson);
    }
}