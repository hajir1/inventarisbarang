import joi from "joi";

export const userValidate = joi.object({
  username: joi.string().min(3).max(20).required(),
  password: joi.string().min(3).max(20).required(),
  role: joi.string().required(),
});
export const loginValidate = joi.object({
  username: joi.string().min(3).max(20).required(),
  password: joi.string().min(3).max(20).required(),
});

export const alatValidate = joi.object({
  nama_alat: joi.string().min(3).max(20).required(),
  kondisi: joi.string().min(3).max(20),
  deskripsi: joi.string().min(3).max(200),
  jumlah: joi.number(),
  no_seri: joi.string().min(3).max(200),
  diperoleh: joi.string().min(3).max(200),
});
export const serviceValidate = joi.object({
  jenis_service: joi.string().min(3).max(100).required(),
  waktu: joi.string().min(3).max(50),
  alat_id: joi.number(),
});
export const dipakaiValidate = joi.object({
  nama_pemakai: joi.string().min(3).max(100).required(),
  waktu_pinjam: joi.string().min(3).max(100).required(),
  deskripsi: joi.string().min(3).max(100),
  alat_id: joi.number(),
});
