export default class ExpenseClient {
  static baseUrl = 'http://localhost:8080/api';


  // Rest Endpoint - GET Expenses
  static async getExpenses(userId) {
    const url = `${ExpenseClient.baseUrl}/expenses${userId ? `?userId=${encodeURIComponent(userId)}` : ''}`;
    try {
      // Save HTTP Fetched Data (Crucial to use 'const response' in Client)
      const response = await fetch(url);
      // If status error, throw exception
      if (!response.ok) {
        throw new Error(`Failed to fetch expenses from ${url}`);
      }
      // Return Extract JSON Details or Display Error
      return await response.json();
    } catch (err) {
      console.error("Error fetching expenses:", err);
      return [];
    }
  }

  // Rest Endpoint - POST Expense
  static async addExpense(expense) {
    const url = `${ExpenseClient.baseUrl}/expenses`;
    try {
      // Save HTTP Fetched Data
      const response = await fetch(url, {
        // Post Requirements
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      // If Status Error, Throw Exception
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(text || "Failed to add expense");
      }
      // Return Extracted JSON Created Expense Object or Display Error
      return await response.json();
    } catch (err) {
      console.error("Error adding expense:", err);
      throw err;
    }
  }


  // Rest Endpoint - PUT Expense
  static async updateExpense(id, expense) {
    const url = `${ExpenseClient.baseUrl}/expenses/${encodeURIComponent(id)}`;
    try {
      // Save HTTP Fetched Data
      const response = await fetch(url, {
        // Put Requirements
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      // If Status Error, Throw Exception
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(text || "Failed to update expense");
      }
      // Return Extracted JSON Expense Object or Display Error
      return await response.json();
    } catch (err) {
      console.error("Error updating expense:", err);
      throw err;
    }
  }


  // Rest Endpoint - DELETE Expense
  static async deleteExpense(id) {
    const url = `${ExpenseClient.baseUrl}/expenses/${encodeURIComponent(id)}`;
    try {
      // Save HTTP Fetched Data
      const response = await fetch(url, {
        // Delete Requirements
        method: 'DELETE'
      });
      // If Status Error, Throw Exception
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(text || "Failed to delete expense");
      }
      // If No JSON Content on Delete
      if (response.status === 204) return true;
      
      // Else, If JSON Content on Delete
      try {
        return await response.json();
      } catch {
        return true;

      }
    } catch (err) {
      console.error("Error deleting expense:", err);
      throw err;
    }
  }
}
