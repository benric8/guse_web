export interface BaseResponse{
    codigo: string,
    descripcion: string,
    codigoOperacion: string
}
export interface GenericResponse extends BaseResponse{
    data: any,
}
export interface BasePaginacionResponse{
    totalRecords: number,
    rows: number,
    currentPage: number,
    startPage: number,
    finalPage: number
}