export interface Membership {
  membershipId: string,
  name: string,
  sellingDate: Date,
  startDate: Date,
  endDate: Date,
  occasionsLeft?: number
}
