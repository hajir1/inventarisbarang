import {
  BatalkanPakai,
  BatalkanService,
  DapatAlatById,
  DapatAlatByIdExtra,
  DapatSemuaAlat,
  GetDipakais,
  GetService,
  HapusAlatById,
  HapusRiwayatPakai,
  HapusRiwayatService,
  HapusSemuaAlat,
  SelesaiPakai,
  SelesaiService,
  ServiceAlat,
  TambahAlat,
  TambahDipakai,
} from "../service/alat.service.js";

export const TambahAlatC = async (req, res, next) => {
  try {
    const data = await TambahAlat(req);
    res.status(200).json({ message: "sukses menambah data alat", data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};

export const DapatSemuaAlatC = async (req, res, next) => {
  try {
    const data = await DapatSemuaAlat();
    res
      .status(200)
      .json({ message: "sukses mendapatkan semua data alat", data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const DapatAlatByIdC = async (req, res, next) => {
  try {
    const data = await DapatAlatById(req);
    res
      .status(200)
      .json({ message: "sukses mendapatkan data alat by id", data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const HapusSemuaAlatC = async (req, res, next) => {
  try {
    const data = await HapusSemuaAlat();
    res.status(200).json({ message: "sukses menghapus semua data alat", data });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const HapusAlatByIdC = async (req, res, next) => {
  try {
    const data = await HapusAlatById(req);
    res.status(200).json({
      message: `sukses menghapus alat dengan id ${req.params.id}`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const DapatAlatByIdExtraC = async (req, res, next) => {
  try {
    const data = await DapatAlatByIdExtra(req);
    res.status(200).json({
      message: `sukses mendapat data alat dengan id ${req.params.id}`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};

// service alaat
export const ServiceAlatC = async (req, res, next) => {
  try {
    const data = await ServiceAlat(req);
    res.status(200).json({
      message: `sukses menservice alat`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const GetServiceC = async (req, res, next) => {
  try {
    const data = await GetService();
    res.status(200).json({
      message: `sukses mendapat service alat`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const BatalkanServiceC = async (req, res, next) => {
  try {
    const data = await BatalkanService(req);
    res.status(200).json({
      message: `sukses membatalkan service alat`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const SelesaiServiceC = async (req, res, next) => {
  try {
    const data = await SelesaiService(req);
    res.status(200).json({
      message: `sukses menyelesaikan service alat`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};

// pakai
export const TambahDiapakaiC = async (req, res, next) => {
  try {
    const data = await TambahDipakai(req);
    res.status(200).json({
      message: `sukses menambah dipakai alat`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const GetDipakaisC = async (req, res, next) => {
  try {
    const data = await GetDipakais();
    res.status(200).json({
      message: `sukses mendapat dipakai alat`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const BatalkanPakaiC = async (req, res, next) => {
  try {
    const data = await BatalkanPakai(req);
    res.status(200).json({
      message: `sukses membatalkan pemakaian alat`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const SelesaiPakaiC = async (req, res, next) => {
  try {
    const data = await SelesaiPakai(req);
    res.status(200).json({
      message: `sukses menyelesaikan pemakaian alat`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const HapusRiwayatPakaiC = async (req, res, next) => {
  try {
    const data = await HapusRiwayatPakai(req);
    res.status(200).json({
      message: `sukses menghapus riwayat pemakaian alat`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
export const HapusRiwayatServiceC = async (req, res, next) => {
  try {
    const data = await HapusRiwayatService(req);
    res.status(200).json({
      message: `sukses menghapus riwayat pemakaian alat`,
      data,
    });
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
    next(error);
  }
};
