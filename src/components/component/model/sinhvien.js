export const sinhvien_model = (ChungMinhThu,MaSinhVien,SoBaoDanh,GioiTinh_MaMuc,GioiTinh_TenMuc,HoVaTen,MaNhapHoc,SoHoSo,NgaySinh,EmailVNU,SoNhaChiTiet,TinhThanh_MaMuc,TinhThanh_TenMuc,TinhThanh_type,QuanHuyen_MaMuc,QuanHuyen_TenMuc,QuanHuyen_type,PhuongXa_MaMuc,PhuongXa_TenMuc,PhuongXa_type,MaHanhChinh,TenGoi,TrangThaiTaiKhoan,SoDienThoai)=>{
    const data= {
        ChungMinhThu: ChungMinhThu,
        MaSinhVien: MaSinhVien,
        SoBaoDanh: SoBaoDanh,
        GioiTinh: {
          type: "C_GioiTinh",
          MaMuc: GioiTinh_MaMuc,
          TenMuc: GioiTinh_TenMuc,
        },
        HoVaTen: HoVaTen,
        MaNhapHoc: MaNhapHoc,
        SoHoSo: SoHoSo,
        NgaySinh: NgaySinh,
        EmailVNU: EmailVNU,
        DiaChiThuongTru: {
          SoNhaChiTiet: SoNhaChiTiet,
          TinhThanh: {
            MaMuc: TinhThanh_MaMuc,
            TenMuc: TinhThanh_TenMuc,
            type: TinhThanh_type,
          },
          QuanHuyen: {
            MaMuc: QuanHuyen_MaMuc,
            TenMuc: QuanHuyen_TenMuc,
            type: QuanHuyen_type,
          },
          PhuongXa: {
            MaMuc: PhuongXa_MaMuc,
            TenMuc: PhuongXa_TenMuc,
            type: PhuongXa_type,
          },
        },
        CoQuanDonVi: {
          MaHanhChinh: MaHanhChinh,
          TenGoi: TenGoi,
        },
        TrangThaiTaiKhoan: TrangThaiTaiKhoan,
        DanhBaLienLac: {
          SoDienThoai: SoDienThoai,
        },
      }

    return data;
}