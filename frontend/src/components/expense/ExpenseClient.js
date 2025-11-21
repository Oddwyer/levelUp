import mockExpenses from "./seedData";
import axios from "axios";


// Red Endpoints Expense Client (Using Axios)
export default class ExpenseClient {
  static baseUrl = 'http://localhost:8080/api';


  // Rest Endpoint - GET  
  static async getExpenses(userId) {
    const url = `${ExpenseClient.baseUrl}/expenses${userId ? `?userId=${encodeURIComponent(userId)}` : ''}`;
    try {
      const response = await axios.get(url);
      // Return Extract JSON Details or Display Error
      return response.data;
    } catch (err) {
      console.error("Error fetching expenses:", err);
      return [];
    }
  }

  // Rest Endpoint - POST expense (using axios method)
  static async addExpense(expense) {
    const url = `${ExpenseClient.baseUrl}/expenses`;
    try {
      // Save HTTP fetched data
      const response = await axios.post(url,expense);
      // Return extracted JSON from created expense object or display error
      return response.data
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
      const response = await axios.put(url,expense);
      // Return extracted JSON from expense object or display error
      return response.data;
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
      const response = await axios.delete(url);
      // If JSON content on delete (uncommon)
      try {
        return await response.data;
      } catch {
        return true;

      }
    } catch (err) {
      console.error("Error deleting expense:", err);
      throw err;
    }
  }
}
