import Ticket from "@/entities/Ticket";
import TicketType from "@/entities/TicketType";
import User from "@/entities/User";
export async function postTicketPayment(body: Ticket) {
  console.log(body);
  //   const user = await User.findById(userId);
  const ticket = await Ticket.createNew(body);
  return ticket;
}
