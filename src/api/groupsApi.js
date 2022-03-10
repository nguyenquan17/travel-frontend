import Api from "./Api";

const url = "/groups"

const getAllGroups = (page, size, sortField , sortType,search) => {
    // default parameters
    if (sortField === null || sortField === undefined || sortType === null || sortType === undefined) {
        sortField = "id";
        sortType = "asc";
    }
    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`,
        search
    }
    if(search){
        parameters.search = search;
    }
    return Api.get(`${url}`, {params: parameters});
};

const existsByName = (name) => {
    return Api.get(`${url}/name/${name}`);
};

const create = (name, totalMember) => {
    const body = {
        name,
        totalMember
    };

    return Api.post(`${url}/create`, body);
};

const update = (id, name, totalMember) => {
    const body = {
        name,
        totalMember
    }
    return Api.put(`${url}/${id}`, body);
}

const deleteMultiple = (ids) => {
    return Api.delete(`${url}/${ids}`)
}
// export
const api = { getAllGroups, existsByName, create, update, deleteMultiple }
export default api;