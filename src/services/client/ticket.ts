import Ticket from "@/entities/Ticket";
import User from "@/entities/User";
export async function postTicketPayment(body: Ticket) {
  const user = await User.findById(Number(body.user));

  if (!user) {
    return false;
  }
  const conflict = await Ticket.findPaymentByUserId(Number(body.user));

  if (conflict) {
    return null;
  }

  const ticket = await Ticket.createNew(body);
  return ticket;
}
