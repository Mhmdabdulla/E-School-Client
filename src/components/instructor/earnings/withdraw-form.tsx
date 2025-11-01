import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createWithdrawFormSchema, type WithdrawFormValuesSchemaType } from "@/schemas/revenue/withdraw.schema"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import {type PayoutRequest } from "@/types/revenue"

// Flattened schema


interface WithdrawFormProps {
  onCreateRequest: (data: PayoutRequest) => void
  currentBalance: number
  isSubmitting: boolean
}

export function WithdrawForm({ onCreateRequest, currentBalance, isSubmitting }: WithdrawFormProps) {

  const form = useForm<WithdrawFormValuesSchemaType>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createWithdrawFormSchema(currentBalance)) as any,
    defaultValues: {
      amount: 0,
      method: undefined,
      upiId: "",
      paypalEmail: "",
      accountHolderName: "",
      accountNumber: "",
      ifsc: "",
      bankName: "",
    },
  })

  const method = form.watch("method")

  const onSubmit = async(data: WithdrawFormValuesSchemaType) => {
    const filteredData = {
      amount: data.amount,
      method: data.method,
      ...(data.method === "upi" && { upiId: data.upiId }),
      ...(data.method === "paypal" && { paypalEmail: data.paypalEmail }),
      ...(data.method === "bank" && {
        accountHolderName: data.accountHolderName,
        accountNumber: data.accountNumber,
        ifsc: data.ifsc,
        bankName: data.bankName,
      }),
    };
    onCreateRequest(filteredData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount" {...field} />
              </FormControl>
              <FormDescription>
                Maximum withdrawal: ₹{currentBalance.toFixed(2)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {method === "bank" && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account holder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ifsc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IFSC Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter IFSC code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bank name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {method === "upi" && (
          <FormField
            control={form.control}
            name="upiId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPI ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter UPI ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {method === "paypal" && (
          <FormField
            control={form.control}
            name="paypalEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PayPal Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter PayPal email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Submit Withdrawal Request"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}