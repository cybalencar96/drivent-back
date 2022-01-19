import Ticket from "@/entities/Ticket";

export async function getTicketInfo(userId: number) {
  const ticket = await Ticket.getTicketInfo(userId);
  return ticket;
}
