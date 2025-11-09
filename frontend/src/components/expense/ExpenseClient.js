export default class RestClient {
  static baseUrl = 'http://localhost:8080/api';


  // Rest endpoint to get expenses
  static async getExpenses(userId) {
    const url = `${RestClient.baseUrl}/expenses?userId=${userId ? `?userId=${encodeURIComponent(userId)}` : ''}`;
    try {
      // Save Fetched Data
      const response = await fetch(url);
      // If status error, throw exception
      if (!response.ok) {
        throw new Error('Failed to fetch expenses from ${url}');
      }
      // Return Details or Display Error
      return await response.json();
    } catch (err) {
      console.error('Error fetching expenses:', err);
      return [];
    }
  }

  // Rest Endpoint - Add Expense
  static async addExpense(expense) {
    const url = `${RestClient.baseUrl}/expenses`;
    try {
      // Save Fetched Data
      const response = await fetch(url, {
        // Post Requirements
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      // If Status Error, Throw Exception
      if (!response.ok) {
        const text = await resp.text().catch(() => '');
        throw new Error(text ||'Failed to add expense');
      }
      // Return Details or Display Error
      return await response.json();
    } catch (err) {
      console.error('Error adding expense:', err);
      throw err;
    }
  }
}
