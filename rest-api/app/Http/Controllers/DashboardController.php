<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Models\Protocol;
use App\Models\StudentClass;
use App\Models\StudentSecondary;
use App\Models\ProtocolClass;

class DashboardController extends Controller
{
    public function index() {
        $teachersCount = Teacher::count();
        $protocolsCount = Protocol::count();
        $studentsClassCount = StudentClass::count();
        $studentsSecondaryCount = StudentSecondary::count();
        
        $teacningsCount = Teacher::join('applications', 'applications.teacher_id', '=', 'teachers.id')
                                ->join('teachings', 'teachings.application_id', '=', 'applications.id')
                                ->whereNull('teachings.notApprove')
                                ->where('applications.inProtocol', '1')
                                ->count();

        $reportsCount = Teacher::join('applications', 'applications.teacher_id', '=', 'teachers.id')
                                ->join('reports', 'reports.application_id', '=', 'applications.id')
                                ->whereNull('reports.notApprove')
                                ->where('applications.inProtocol', '1')
                                ->count();

        $publicationsCount = Teacher::join('applications', 'applications.teacher_id', '=', 'teachers.id')
                                    ->join('publications', 'publications.application_id', '=', 'applications.id')
                                    ->whereNull('publications.notApprove')
                                    ->where('applications.inProtocol', '1')
                                    ->count();
        $certificatesCount = $teacningsCount + $reportsCount + $publicationsCount;
        $protocolsClassCount = ProtocolClass::count();

        return response()->json([
            'teachersCount' => $teachersCount,
            'protocolsCount' => $protocolsCount,
            'studentsClassCount' => $studentsClassCount,
            'studentsSecondaryCount' => $studentsSecondaryCount,
            'certificatesCount' => $certificatesCount,
            'protocolsClassCount' => $protocolsClassCount
        ]);
    }
}
