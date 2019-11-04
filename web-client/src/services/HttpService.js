import settings from '../../config/settings';

export class HttpService {
  constructor(settings) {
    this.backendUrl = settings.BackendUrl;
    this.options = {};
  }

  get(url, body) {
    return fetch(`${this.backendUrl}/${url}`, {
      ...this.options,
      method: 'GET',
      body,
    });
  }

  post(url, body) {
    return fetch(`${this.backendUrl}/${url}`, {
      ...this.options,
      method: 'POST',
      body,
    });
  }

  put(url, body) {
    return fetch(`${this.backendUrl}/${url}`, {
      ...this.options,
      method: 'PUT',
      body,
    });
  }

  delete(url, body) {
    return fetch(`${this.backendUrl}/${url}`, {
      ...this.options,
      method: 'DELETE',
      body,
    });
  }

  setHeaders(headers) {
    this.options = {
      ...this.options,
      headers,
    };
  }
}

export default new HttpService(settings);
