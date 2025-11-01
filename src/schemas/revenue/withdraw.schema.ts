import * as z from 'zod'

// Define the schema without the dynamic currentBalance first
const withdrawFormSchemaBase = z.object({
  amount: z.coerce.number().min(0.01, { message: "Amount must be greater than 0" }),
  method: z.string().min(1, { message: "Payment method is required" }),
  upiId: z.string().optional(),
  paypalEmail: z.string().optional(),
  accountHolderName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifsc: z.string().optional(),
  bankName: z.string().optional(),
});

// Export the type from the base schema
export type WithdrawFormValuesSchemaType = z.infer<typeof withdrawFormSchemaBase>;

// Create the dynamic schema function
export const createWithdrawFormSchema = (currentBalance: number) =>
  withdrawFormSchemaBase
    .refine((data) => data.amount <= currentBalance, {
      message: `Amount cannot exceed ₹${currentBalance.toFixed(2)}`,
      path: ["amount"],
    })
    .superRefine((data, ctx) => {
      if (data.method === "upi") {
        if (!data.upiId || data.upiId.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["upiId"],
            message: "UPI ID is required for UPI payments",
          });
        }
      }

      if (data.method === "paypal") {
        if (!data.paypalEmail || data.paypalEmail.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["paypalEmail"],
            message: "PayPal email is required for PayPal payments",
          });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.paypalEmail)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["paypalEmail"],
            message: "Invalid email format",
          });
        }
      }

      if (data.method === "bank") {
        if (!data.accountHolderName || data.accountHolderName.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["accountHolderName"],
            message: "Account holder name is required for bank transfers",
          });
        }
        if (!data.accountNumber || data.accountNumber.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["accountNumber"],
            message: "Account number is required for bank transfers",
          });
        }
        if (!data.ifsc || data.ifsc.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["ifsc"],
            message: "IFSC code is required for bank transfers",
          });
        }
        if (!data.bankName || data.bankName.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["bankName"],
            message: "Bank name is required for bank transfers",
          });
        }
      }
    });