import mockExpenses from "./seedData";

export default class ExpenseClient {
  static baseUrl = 'http://localhost:8080/api';


  // Rest Endpoint - GET e
  static async getExpenses(userId) {
    const url = `${ExpenseClient.baseUrl}/expenses${userId ? `?userId=${encodeURIComponent(userId)}` : ''}`;
    try {
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

  // Rest Endpoint - POST expense
  static async addExpense(expense) {
    const url = `${ExpenseClient.baseUrl}/expenses`;
    try {
      // Save HTTP fetched data
      const response = await fetch(url, {
        // Post requirements
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      // If status error, throw exception
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(text || "Failed to add expense");
      }
      // Return extracted JSON from created expense object or display error
      return await response.json();
    } catch (err) {
      console.error("Error adding expense:", err);
      throw err;
    }
  }


  // Rest Endpoint - PUT expense
  static async updateExpense(id, expense) {
    const url = `${ExpenseClient.baseUrl}/expenses/${encodeURIComponent(id)}`;
    try {
      // Save HTTP fetched data
      const response = await fetch(url, {
        // Put requirements
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      // If status error, throw exception
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(text || "Failed to update expense");
      }
      // Return extracted JSON from expense object or display error
      return await response.json();
    } catch (err) {
      console.error("Error updating expense:", err);
      throw err;
    }
  }


  // Rest Endpoint - DELETE expense
  static async deleteExpense(id) {
    const url = `${ExpenseClient.baseUrl}/expenses/${encodeURIComponent(id)}`;
    try {
      // Save HTTP fetched data
      const response = await fetch(url, {
        // Delete requirements
        method: 'DELETE'
      });
      // If status error, throw exception
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(text || "Failed to delete expense");
      }
      // If no JSON content on delete (common)
      if (response.status === 204) return true;
      
      // Else, if JSON content on delete (uncommon)
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
