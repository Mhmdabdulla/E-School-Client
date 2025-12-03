import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {type PayoutRequestData } from "@/types/revenue"
import { CoursePagination } from "../common/pagination";

// const withdrawals = [
//   {
//     id: "1",
//     date: "21 Sep, 2021 at 2:14 AM",
//     method: "Mastercards",
//     amount: "American Express",
//     status: "pending",
//   },
//   {
//     id: "2",
//     date: "21 Sep, 2021 at 2:14 AM",
//     method: "Visa",
//     amount: "American Express",
//     status: "pending",
//   },
//   {
//     id: "3",
//     date: "21 Sep, 2021 at 2:14 AM",
//     method: "Visa",
//     amount: "American Express",
//     status: "pending",
//   },
//   {
//     id: "4",
//     date: "21 Sep, 2021 at 2:14 AM",
//     method: "Mastercards",
//     amount: "American Express",
//     status: "completed",
//   },
//   {
//     id: "5",
//     date: "21 Sep, 2021 at 2:14 AM",
//     method: "Visa",
//     amount: "American Express",
//     status: "cancelled",
//   },
// ]

interface WithdrawalHistoryProps {
  withdrawals: PayoutRequestData[],
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function WithdrawalHistory({withdrawals,currentPage,totalPages,onPageChange,isLoading=false}: WithdrawalHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdraw History</CardTitle>
        <CardDescription>Your recent withdrawal requests</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawals.map((withdrawal) => (
              <TableRow key={withdrawal._id}>
                <TableCell className="font-medium">{new Date(withdrawal.requestedAt).toLocaleDateString()}</TableCell>
                <TableCell>{withdrawal.method}</TableCell>
                <TableCell>{withdrawal.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      withdrawal.status === "completed"
                        ? "default"
                        : withdrawal.status === "cancelled"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {/* <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {!isLoading && totalPages > 0 && (
          <div className="flex justify-center mt-4">
            <CoursePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}