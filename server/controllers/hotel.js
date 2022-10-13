import Hotel from '../models/Hotel.js';

//----------create hotel--------------------------
export const createHotel = async (req, res, next) => {
  const newHotel = await new Hotel(req.body);

  try {
    const hotel = await newHotel.save();
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

//----------update hotel----------------------------
export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};

//--------------delete hotel----------------------------
export const deleteHotel = async (req, res, next) => {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted');
  } catch (err) {
    next(err);
  }
};

//------------- get hotel----------------
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

//-------------------get hotels---------------
export const getHotels = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
 
// -----------------Count by city--------------
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  console.log(cities);
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};