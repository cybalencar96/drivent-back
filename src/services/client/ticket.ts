import Ticket from "@/entities/Ticket";

export async function getTicketInfo(userId: number) {
  const ticket = await Ticket.findTicketByUserId(userId);
  return ticket;
}
