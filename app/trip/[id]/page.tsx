"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

type Expense = {
  id: string
  category: string
  amount: number
  note: string | null
}

const categories = ["🏨 Hotel", "🍕 Food", "🚗 Transport", "🎭 Activities", "🛍️ Shopping", "✈️ Flights", "💊 Health", "📦 Other"]

export default function TripPage() {
  const { id } = useParams()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [category, setCategory] = useState(categories[0])
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/expenses?tripId=${id}`)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
  }, [id])

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  async function addExpense(e: React.FormEvent) {
    e.preventDefault()
    if (!amount) return
    setLoading(true)

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripId: id, category, amount, note }),
    })

    const newExpense = await res.json()
    setExpenses([newExpense, ...expenses])
    setAmount("")
    setNote("")
    setLoading(false)
  }

  async function deleteExpense(expenseId: string) {
    await fetch("/api/expenses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: expenseId }),
    })
    setExpenses(expenses.filter((e) => e.id !== expenseId))
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Budget Tracker</h1>
        <p className="text-gray-400 mb-8">Track your trip expenses</p>

        {/* Total */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 mb-8">
          <p className="text-gray-400 text-sm">Total Spent</p>
          <p className="text-4xl font-bold text-orange-400 mt-1">${total.toFixed(2)}</p>
        </div>

        {/* Add Expense Form */}
        <form onSubmit={addExpense} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Add Expense</h2>
          <div className="flex flex-col gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Amount ($)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              {loading ? "Adding..." : "+ Add Expense"}
            </button>
          </div>
        </form>

        {/* Expenses List */}
        <div className="flex flex-col gap-3">
          {expenses.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No expenses yet — add your first one!</p>
          ) : (
            expenses.map((expense) => (
              <div key={expense.id} className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{expense.category}</p>
                  {expense.note && <p className="text-gray-400 text-sm mt-0.5">{expense.note}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-orange-400 font-semibold">${expense.amount.toFixed(2)}</p>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-gray-600 hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}