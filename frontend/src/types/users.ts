export type User = {
  id: number;
  email: string;
  name: string;
  surname: string;
  subscriptionPlan: "FREE_TRIAL" | "PAID";
  subscriptionExpiry: Date;
};

export interface UpdateUserDto {
  name?: string;
  surname?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  subscriptionPlan?: "FREE_TRIAL" | "PAID";
}
