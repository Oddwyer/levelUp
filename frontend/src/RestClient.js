export default class RestClient {
  static baseUrl = 'http://localhost:8080';

  // Rest endpoint to get expenses
  static async getExpenses() {
    const url = `${RestClient.base.url}/expenses`;
    try {
      // Save fetched data
      const response = await fetch(url);
      // If status error, throw exception
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      // Return details
      return await response.json();
    } catch (err) {
      console.error('Error fetching expenses:', err);
      return [];
    }
  }

  // Rest endpoint to add expense
  static async addExpense(expense) {
    const url = `${RestClient.base.url}/expenses`;
    try {
      // Save fetched data
      const response = await fetch(url, {
        // Post requirements
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      // If status error, throw exception
      if (!response.ok) {
        throw new Error('Failed to add expense');
      }
      // Return details
      return await response.json();
    } catch (err) {
      console.error('Error adding expense:', err);
      return null;
    }
  }
}
