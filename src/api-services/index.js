import {post} from '../utils/fetch';

export function uploadImage(file, token) {
    const formdata = new FormData();
    formdata.append('avatar', file);
    console.log(token);
    return post(`/api/uploadImage?token=${token}`, formdata, {
        contentType: 'multipart/form-data'
    });
}