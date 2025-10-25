export default class RestClient {
  static baseUrl = 'http://localhost:8080';

  static getExpenses() {
    const url = `${RestClient.base.url}/expenses`;
    const promise = fetch(url).then((response) => {
      return response.json().catch((error) => {
        console.error('Error fetching expenses:', error);
      });
    });

    return promise;
  }
}
