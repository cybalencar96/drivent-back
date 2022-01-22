import Hotel from "@/entities/Hotel";
import Room from "@/entities/Hotel";

async function listAll() {
  return Hotel.find({});
}

export default {
  listAll,
};
