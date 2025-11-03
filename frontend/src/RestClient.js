export default class RestClient {
  static baseUrl = 'http://localhost:8080/api';


  // Rest endpoint to get expenses
  static async getExpenses() {
    const url = `${RestClient.baseUrl}/expenses`;
    try {
      return [
        {
          "id": 1,
          "category": "Groceries",
          "amount": 75.50,
          "description": "Weekly supermarket shopping",
          "expense_date": "2025-11-01T00:00:00.000Z",
          "created_at": "2025-11-01T14:32:00.000Z"
        },
        {
          "id": 2,
          "category": "Utilities",
          "amount": 120.00,
          "description": "Electricity bill for October",
          "expense_date": "2025-10-30T00:00:00.000Z",
          "created_at": "2025-10-30T09:15:00.000Z"
        },
        {
          "id": 3,
          "category": "Entertainment",
          "amount": 45.75,
          "description": "Movie night and snacks",
          "expense_date": "2025-11-02T00:00:00.000Z",
          "created_at": "2025-11-02T20:05:00.000Z"
        },
        {
          "id": 4,
          "category": "Entertainment",
          "amount": 45.75,
          "description": "Movie night and snacks",
          "expense_date": "2025-11-02T00:00:00.000Z",
          "created_at": "2025-11-02T20:05:00.000Z"
        }
      ]

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
    const url = `${RestClient.baseUrl}/expenses`;
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
