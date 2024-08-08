import { Prisma } from "../config/prisma.mjs";
import ResponseError from "../error/ResponseError.mjs";

import { mainValidate } from "../validation/mainValidate.mjs";
import path from "path";
import {
  alatValidate,
  dipakaiValidate,
  serviceValidate,
} from "../validation/routing.validate.mjs";
export const TambahAlat = async (req) => {
  const file = req.files.file;
  const dataValid = mainValidate(alatValidate, req.body);
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const filePath = `./public/images/${fileName}`;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedtype = [".jpg", ".jpeg", ".png"];
  if (!allowedtype.includes(ext.toLowerCase())) {
    throw new ResponseError(400, "ekstensi gambar tidak di izinkan");
  }
  if (fileSize > 5000000) {
    throw new ResponseError(400, "file gambar terlalu besar");
  }

  try {
    if (file) {
      await file.mv(filePath);
    }

    return await Prisma.alats.create({
      data: {
        gambar: fileName,
        url: url,
        nama_alat: dataValid.nama_alat,
        deskripsi: dataValid.deskripsi,
        no_seri: dataValid.no_seri,
        kondisi: dataValid.kondisi,
        diperoleh: dataValid.diperoleh,
      },
    });
  } catch (error) {
    console.log(error.message);
    throw new ResponseError(500, error.message);
  }
};

export const DapatSemuaAlat = async () => {
  return await Prisma.alats.findMany();
};
export const DapatAlatById = async (req) => {
  return await Prisma.alats.findMany({
    where: {
      nama_alat: {
        startsWith: req.params.id,
      },
    },
  });
};
export const DapatAlatByIdExtra = async (req) => {
  return await Prisma.alats.findMany({
    where: {
      id: Number(req.params.id),
    },
    include: {
      dipakais: true,
      services: true,
    },
  });
};
export const HapusSemuaAlat = async () => {
  return await Prisma.alats.deleteMany({});
};
export const HapusAlatById = async (req) => {
  return await Prisma.alats.delete({
    where: {
      id: Number(req.params.id),
    },
  });
};

// service alat
export const ServiceAlat = async (req) => {
  const dataValid = mainValidate(serviceValidate, req.body);
  const dataPakai = await Prisma.alats.findUnique({
    where: {
      id: dataValid.alat_id,
    },
  });

  if (dataPakai.service === true) {
    throw new ResponseError(400, "alat sedang diservice");
  } else if (dataPakai.dipakai === true) {
    throw new ResponseError(400, "alat sedang dipakai");
  } else {
    await Prisma.alats.update({
      data: {
        service: true,
      },
      where: {
        id: dataValid.alat_id,
      },
    });
  }

  return Prisma.services.create({
    data: {
      alat_id: dataValid.alat_id,
      jenis_service: dataValid.jenis_service,
      waktu: dataValid.waktu,
    },
  });
};

export const GetService = async () => {
  return await Prisma.alats.findMany({
    where: {
      service: true,
    },
    include: {
      services: true,
    },
  });
};
export const BatalkanService = async (req) => {
  await Prisma.alats.update({
    where: {
      id: Number(req.params?.alat),
    },
    data: {
      service: false,
    },
  });
  return await Prisma.services.delete({
    where: {
      id: Number(req.params?.service),
    },
    include: {
      alats: true,
    },
  });
};
export const SelesaiService = async (req) => {
  const date = new Date();
  await Prisma.services.update({
    data: {
      waktu_selesai: `${date}`,
    },
    where: {
      id: Number(req.params?.service),
    },
  });
  return await Prisma.alats.update({
    where: {
      id: Number(req.params?.alat),
    },
    data: {
      service: false,
    },
  });
};
export const HapusRiwayatService = async (req) => {
  return await Prisma.services.delete({
    where: {
      id: Number(req.params?.id),
    },
    include: {
      alats: true,
    },
  });
};

// alat dipakai

export const TambahDipakai = async (req) => {
  const dataValid = mainValidate(dipakaiValidate, req.body);
  const dataPakai = await Prisma.alats.findUnique({
    where: {
      id: dataValid.alat_id,
    },
  });

  if (dataPakai.dipakai === true) {
    throw new ResponseError(400, "alat sedang dipakai");
  } else if (dataPakai.service === true) {
    throw new ResponseError(400, "alat sedang di service");
  } else {
    await Prisma.alats.update({
      data: {
        dipakai: true,
      },
      where: {
        id: dataValid.alat_id,
      },
    });
  }

  return Prisma.dipakais.create({
    data: {
      nama_pemakai: dataValid.nama_pemakai,
      waktu_pinjam: dataValid.waktu_pinjam,
      deskripsi: dataValid.deskripsi,
      alat_id: dataValid.alat_id,
    },
  });
};
export const GetDipakais = async () => {
  return await Prisma.alats.findMany({
    where: {
      dipakai: true,
    },
    include: {
      dipakais: true,
    },
  });
};
export const BatalkanPakai = async (req) => {
  await Prisma.alats.update({
    where: {
      id: Number(req.params?.alat),
    },
    data: {
      dipakai: false,
    },
  });
  return await Prisma.dipakais.delete({
    where: {
      id: Number(req.params?.pakai),
    },
    include: {
      alats: true,
    },
  });
};
export const SelesaiPakai = async (req) => {
  const date = new Date();
  await Prisma.dipakais.update({
    data: {
      waktu_selesai: `${date}`,
    },
    where: {
      id: Number(req.params?.pakai),
    },
  });
  return await Prisma.alats.update({
    where: {
      id: Number(req.params?.alat),
    },
    data: {
      dipakai: false,
    },
  });
};
export const HapusRiwayatPakai = async (req) => {
  return await Prisma.dipakais.delete({
    where: {
      id: Number(req.params?.id),
    },
    include: {
      alats: true,
    },
  });
};
