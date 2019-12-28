import {post} from '../../utils/fetch';

export function uploadImage(file) {
    const formdata = new FormData();
    formdata.append('avatar', file);
    return post('/api/uploadImage', formdata, {
        contentType: 'multipart/form-data'
    });
} 