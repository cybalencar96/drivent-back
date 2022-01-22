import Hotel from "@/entities/Hotel";

async function listAll() {
  return Hotel.find({});
}

export default {
  listAll,
};
