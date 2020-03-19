export default function calculateShipCapacity({ apiData, weight }) {
  // this function will calculate the ship capacity and the weight
  try {
    // gets the cargo capacity from ship
    const maxCapacity = apiData.millFalcon.cargo_capacity;
    // defines the percent to calculate
    const percent = 99;

    // get the result of 99% of cargo
    let maxPercentualCapacity = maxCapacity * (percent / 100);
    // set it to capacity
    let capacity = maxPercentualCapacity;

    // loop through response
    for (let i = 0; i < apiData.randomChars.length; i++) {
      // and add to capacity all five random character's mass
      capacity += parseFloat(apiData.randomChars[i].mass);
    }

    // add your weight to capacity
    capacity += weight;

    // store the value to shipCapacity
    let shipCapacity = capacity;

    // return it
    return shipCapacity;
  } catch (e) {
    console.log(e);
  }
}
