import { Router } from "express";
import { StudentRoutes } from "../module/student/student.route";
import { UserRoutes } from "../module/user/user.route";
import { AcademicSemesterRoutes } from "../module/academicSemester/academicSemester.route";
import { AcademicFacultRoutes } from "../module/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../module/academicDepartment/academicDepartment.route";


const router = Router()

const moduleRoutes = [
    {
        path:'/students',
        route: StudentRoutes,
    },
    {
        path:'/users',
        route:UserRoutes,
    },
    {
        path:'/academic-semesters',
        route:AcademicSemesterRoutes
    },
    {
        path:'/academic-faculties',
        route:AcademicFacultRoutes
    },
    {
        path:'/academic-departments',
        route:AcademicDepartmentRoutes
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router