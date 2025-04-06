'use client'

import { useState } from 'react'
import { t2d, d2s, getNow, isSameDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FormattedNumber } from '@/components/FormattedNumber'
import { History, Pencil } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import EmptyState from './EmptyState'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { settingsAtom, usersAtom } from '@/lib/atoms'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { useCoins } from '@/hooks/useCoins'
import { TransactionNoteEditor } from './TransactionNoteEditor'
import { useHelpers } from '@/lib/client-helpers'

export default function CoinsManager() {
  const { currentUser } = useHelpers()
  const [selectedUser, setSelectedUser] = useState<string>()
  const {
    add,
    remove,
    updateNote,
    balance,
    transactions,
    coinsEarnedToday,
    totalEarned,
    totalSpent,
    coinsSpentToday,
    transactionsToday
  } = useCoins({ selectedUser })
  const [settings] = useAtom(settingsAtom)
  const [usersData] = useAtom(usersAtom)
  const DEFAULT_AMOUNT = '0'
  const [amount, setAmount] = useState(DEFAULT_AMOUNT)
  const [pageSize, setPageSize] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)
  const [note, setNote] = useState('')

  const handleSaveNote = async (transactionId: string, note: string) => {
    await updateNote(transactionId, note)
  }

  const handleDeleteNote = async (transactionId: string) => {
    await updateNote(transactionId, '')
  }

  const handleAddRemoveCoins = async () => {
    const numAmount = Number(amount)
    if (numAmount > 0) {
      await add(numAmount, "Manual addition", note)
      setAmount(DEFAULT_AMOUNT)
      setNote('')
    } else if (numAmount < 0) {
      await remove(Math.abs(numAmount), "Manual removal", note)
      setAmount(DEFAULT_AMOUNT)
      setNote('')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold mr-6">Coins Management</h1>
        {currentUser?.isAdmin && (
          <select
            className="border rounded p-2"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            {usersData.users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl animate-bounce hover:animate-none cursor-default">💰</span>
              <div>
                <div className="text-sm font-normal text-muted-foreground">Current Balance</div>
                <div className="text-3xl font-bold"><FormattedNumber amount={balance} settings={settings} /> coins</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentUser?.isAdmin && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 text-lg"
                      onClick={() => setAmount(prev => (Number(prev) - 1).toString())}
                    >
                      -
                    </Button>
                    <div className="relative w-32">
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-center text-xl font-medium h-12"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        🪙
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 text-lg"
                      onClick={() => setAmount(prev => (Number(prev) + 1).toString())}
                    >
                      +
                    </Button>
                  </div>

                  <div className="w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleAddRemoveCoins}
                        className="flex-1 h-14 transition-colors flex items-center justify-center font-medium"
                        variant="default"
                      >
                        <div className="flex items-center gap-2">
                          {Number(amount) >= 0 ? 'Add Coins' : 'Remove Coins'}
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              {/* Top Row - Totals */}
              <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900">
                <div className="text-sm text-green-800 dark:text-green-100 mb-1">Total Earned</div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-50">
                  <FormattedNumber amount={totalEarned} settings={settings} /> 🪙
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900">
                <div className="text-sm text-red-800 dark:text-red-100 mb-1">Total Spent</div>
                <div className="text-2xl font-bold text-red-900 dark:text-red-50">
                  <FormattedNumber amount={totalSpent} settings={settings} /> 💸
                </div>
              </div>

              <div className="p-4 rounded-lg bg-pink-100 dark:bg-pink-900">
                <div className="text-sm text-pink-800 dark:text-pink-100 mb-1">Total Transactions</div>
                <div className="text-2xl font-bold text-pink-900 dark:text-pink-50">
                  {transactions.length} 📈
                </div>
              </div>

              {/* Bottom Row - Today */}
              <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900">
                <div className="text-sm text-blue-800 dark:text-blue-100 mb-1">Today's Earned</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">
                  <FormattedNumber amount={coinsEarnedToday} settings={settings} /> 🪙
                </div>
              </div>

              <div className="p-4 rounded-lg bg-purple-100 dark:bg-purple-900">
                <div className="text-sm text-purple-800 dark:text-purple-100 mb-1">Today's Spent</div>
                <div className="text-2xl font-bold text-purple-900 dark:text-purple-50">
                  <FormattedNumber amount={coinsSpentToday} settings={settings} /> 💸
                </div>
              </div>

              <div className="p-4 rounded-lg bg-orange-100 dark:bg-orange-900">
                <div className="text-sm text-orange-800 dark:text-orange-100 mb-1">Today's Transactions</div>
                <div className="text-2xl font-bold text-orange-900 dark:text-orange-50">
                  {transactionsToday} 📊
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Pagination and Transaction History Display */}
              {/* ... */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
