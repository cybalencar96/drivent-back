interface Enum {
  [key: string]: number;
}

const bedsPerRoom: Enum = {
  Single: 1,
  Double: 2,
  Triple: 3,
};

export default bedsPerRoom;
