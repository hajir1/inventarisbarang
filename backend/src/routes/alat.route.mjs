import express from "express";
import {
  BatalkanPakaiC,
  BatalkanServiceC,
  DapatAlatByIdC,
  DapatAlatByIdExtraC,
  DapatSemuaAlatC,
  GetDipakaisC,
  GetServiceC,
  HapusAlatByIdC,
  HapusRiwayatPakaiC,
  HapusRiwayatServiceC,
  HapusSemuaAlatC,
  SelesaiPakaiC,
  SelesaiServiceC,
  ServiceAlatC,
  TambahAlatC,
  TambahDiapakaiC,
} from "../controller/alat.controller.mjs";
import verifyToken from "../middleware/auth.mjs";

const route = express.Router();
route.post("/tambahalat", TambahAlatC);
route.get("/alat", DapatSemuaAlatC);
route.get("/extra/:id", DapatAlatByIdExtraC);
route.get("/alat/:id", DapatAlatByIdC);
route.delete("/hapusalat", verifyToken, HapusSemuaAlatC);
route.delete("/hapusalat/:id", HapusAlatByIdC);
route.post("/servicealat", ServiceAlatC);
route.get("/servicealat", GetServiceC);
route.post("/dipakaialat", TambahDiapakaiC);
route.get("/dipakaialat", GetDipakaisC);
route.delete("/batalkanpakai/:alat/:pakai", BatalkanPakaiC);
route.patch("/selesaipakai/:alat/:pakai", SelesaiPakaiC);
route.delete("/riwayatpakai/:id", HapusRiwayatPakaiC);
route.delete("/batalkanservice/:alat/:service", BatalkanServiceC);
route.patch("/selesaikanservice/:alat/:service", SelesaiServiceC);
route.delete("/riwayatservice/:id", HapusRiwayatServiceC);

export default route;
