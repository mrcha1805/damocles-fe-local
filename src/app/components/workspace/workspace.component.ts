import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as _ from 'lodash';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsFunnel from 'highcharts/modules/funnel';
import { CubeClientService } from '@services/common/cube-client.service';

HighchartsMore(Highcharts);
HighchartsFunnel(Highcharts);

import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPopperjsTriggers, NgxPopperjsPlacements } from 'ngx-popperjs';
import { ClearallWorkspaceModalComponent } from 'app/modals/clearall-workspace-modal/clearall-workspace-modal.component';
import { SaveWorkspaceModalComponent } from 'app/modals/save-workspace-modal/save-workspace-modal.component';
import { ApiService } from 'app/services/api.service';
import {
  IProjectTemplate,
  Featuregroup,
  ProjectTemplateData,
  SubFeature,
} from 'app/model/project-template-interface';
import { Feature, IRequestProject } from 'app/model/create-project-inteface';
import {
  IQuery,
  LoadResponse,
  IResult,
  IDataFilter,
  FilterData,
  IfunnelList,
} from 'app/model/cube-interface';
import { ICubeReqest } from 'app/model/cube-request-interface';
interface IDataMapping {
  dataCode: string;
  dataCube: string;
}
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements AfterViewInit, OnInit {
  isOpen: boolean = false;
  typeSelected: string;

  chart: any;
  chartData: any = [];
  integrateData: any = [];
  chartColor: any = [];

  projectNameDisplay: string | undefined;
  industryNameDisplay: string | undefined;
  productNameDiaply: string | undefined;
  triggers = NgxPopperjsTriggers;
  placements = NgxPopperjsPlacements;
  offsetModifiers = [
    {
      name: 'offset',
      options: {
        offset: [0, 2],
      },
    },
    {
      name: 'flip',
      options: {
        flipVariations: true,
      },
    },
  ];

  dataMapping: IDataMapping[] = [
    {
      dataCode: 'Age',
      dataCube: 'ageGroup',
    },
    {
      dataCode: 'Gender',
      dataCube: 'gender',
    },
    {
      dataCode: 'Occupation',
      dataCube: 'job',
    },
    {
      dataCode: 'Work Location',
      dataCube: 'workLocationDistrict,workLocationProvince',
    },
    {
      dataCode: 'Life stage',
      dataCube: 'lifeStage',
    },
    {
      dataCode: 'Net Worth',
      dataCube: 'affluencyScore',
    },
    {
      dataCode: 'Digital Spending Score',
      dataCube: 'digitalActivityScore',
    },
    {
      dataCode: 'Propensity to find a job',
      dataCube: 'jobSearchScore',
    },
    {
      dataCode: 'Propensity to buy a car',
      dataCube: 'carScore',
    },
    {
      dataCode: 'Propensity to buy a house',
      dataCube: 'homeScore',
    },
    {
      dataCode: 'Nationality',
      dataCube: 'nationality',
    },
  ];

  cubeResponse: IDataFilter[] = [];
  funnelData: IfunnelList[] = [];
  UniqueCustomer: number = 0;

  //data for save
  filterItem: SubFeature[] = [];
  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private ngModalService: NgbModal,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private cubeService: CubeClientService
  ) {
    this.typeSelected = 'ball-atom';
  }

  ngAfterViewInit(): void {
    this.setOptionChartFunnel();
  }

  ngOnInit(): void {
    this.funnelData = [];
    this.UniqueCustomer = 0;
    // this.loadFunnelData();
    // this.loadData();
    //this.getProjectTemplateApi();
    let productId = this.activatedRoute.snapshot.params.productId;
    if (productId) {
      this.getProjectTemplateByProductApi(productId);
      //this.getProjectTemplateApi();
    }
  }

  projectDataApi: IProjectTemplate | undefined;
  kpiGroup: Featuregroup[] | undefined;
  projectId: string | undefined;
  projectData: ProjectTemplateData | undefined;
  getProjectTemplateApi() {
    this.spinnerService.show();
    this.apiService.dynamicProjectTemplateMockup().subscribe((data: any) => {
      this.projectDataApi = data.body;

      if (this.projectDataApi?.resultCode === '20000') {
        this.kpiGroup = this.projectDataApi?.resultData.feature_group;
        console.log(`=====kpiGroup: ${JSON.stringify(this.kpiGroup)}`);
        this.projectId = this.projectDataApi.resultData.project_id;
        this.projectData = this.projectDataApi?.resultData;
        this.projectNameDisplay = this.projectData?.project_name;
        this.industryNameDisplay = this.projectData?.industry_name;
        this.productNameDiaply = this.projectData?.product_name;
        //console.log(`project Data: ${JSON.stringify(this.projectData)}`);
        //this.setSelectProjectFeature();
        this.spinnerService.hide();
      }
    });
  }

  getProjectTemplateByProductApi(id: string) {
    this.spinnerService.show();
    this.apiService
      .getProjectTemplateByProductAPI(id)
      .subscribe((data: any) => {
        this.projectDataApi = data;
        if (this.projectDataApi?.resultCode === '20000') {
          this.kpiGroup = this.projectDataApi?.resultData.feature_group;
          this.projectId = this.projectDataApi.resultData.project_id;
          this.projectData = this.projectDataApi?.resultData;
          console.log('project data: ' + JSON.stringify(this.projectData));
          this.projectNameDisplay = this.projectData?.project_name;
          this.industryNameDisplay = this.projectData?.industry_name;
          this.productNameDiaply = this.projectData?.product_name;
          //console.log(`project Data: ${JSON.stringify(this.projectData)}`);
          // this.setSelectProjectFeature();
          this.spinnerService.hide();
        }
      });
  }
  objSelect: IRequestProject | undefined;
  setSelectProjectFeature() {
    // let featureSelect: Feature[] = [];
    // featureSelect = [
    //   {
    //     product_feature_id: 10001,
    //     operator: 'Is',
    //     item_value: ['Female', 'Male', 'Unknow'],
    //     range_value: [],
    //     graph_order: 1,
    //     feature_order: 1,
    //   },
    //   {
    //     product_feature_id: 10002,
    //     operator: 'Is',
    //     item_value: ['20-24', '25-29', '30-34'],
    //     range_value: [],
    //     graph_order: 2,
    //     feature_order: 2,
    //   },
    //   {
    //     product_feature_id: 10005,
    //     operator: 'Is',
    //     item_value: ['BANGKOK,SAI MAI', 'BANGKOK,WANG THONGLANG'],
    //     range_value: [],
    //     graph_order: 3,
    //     feature_order: 3,
    //   },
    //   {
    //     product_feature_id: 10008,
    //     operator: 'Is',
    //     item_value: [],
    //     range_value: [0.0, 1.0],
    //     graph_order: 4,
    //     feature_order: 4,
    //   },
    // ];
  }
  filterCubeObj: ICubeReqest[] = [];
  updateDataSelectFilter(data: Featuregroup[]) {
    console.log('data return on workspace : ' + JSON.stringify(data));
    this.filterCubeObj = [];
    data.forEach((d) => {
      let df: SubFeature[] = d.subFeature.filter((e) => {
        return e.selectTag === true;
      });
      if (df.length > 0) {
        let featureSelect: Feature[] = [];
        df.forEach((s) => {
          let ft: Feature;
          // data for save project
          if (s.type === 'range with unknown' && s.selectUnknow === true) {
            ft = {
              product_feature_id: s.product_feature_id,
              operator: s.operator,
              item_value: s.tagSelect,
              range_value: [-1, s.range_value[1]],
              graph_order: s.graph_order,
              feature_order: s.feature_order,
            };
          } else {
            ft = {
              product_feature_id: s.product_feature_id,
              operator: s.operator,
              item_value: s.tagSelect,
              range_value: s.range_value!,
              graph_order: s.graph_order,
              feature_order: s.feature_order,
            };
          }
          featureSelect.push(ft);

          //data for cube filter
        });

        this.objSelect = {
          profile_id: localStorage.getItem('userId')!,
          project_name: this.projectNameDisplay,
          project_description: '',
          inductry_id: Number(this.projectData?.industry_id),
          product_id: Number(this.projectData?.product_id),
          feature: featureSelect,
        };
      }
    });
    this.createFilterCube();
  }

  setOptionChartFunnel() {
    this.chart = Highcharts.chart('chart-funnel', {
      accessibility: {
        enabled: false,
      },
      chart: {
        type: 'funnel',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        height: 'auto',
      },
      colors: this.chartColor,
      credits: {
        enabled: false,
      },
      title: {
        text: null,
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b> ({point.y:,.0f})',
            color: Highcharts.theme || 'black',
          },
          height: '100%',
          minSize: 80,
          center: ['50%', '50%'],
          neckWidth: '33%',
          neckHeight: 0,
          width: '67%',
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 5,
          states: {
            hover: {
              brightness: 0.1,
              enabled: true,
            },
          },
        },
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          name: 'Count: ',
          data: this.chartData,
          enableMouseTracking: true,
        },
      ],
      tooltip: {
        enabled: false,
      },
    } as any);
  }

  showSpinner(path: string) {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.router.navigateByUrl(path);
    }, 1000);
  }

  goKpi() {
    this.showSpinner('/kpi');
  }

  clearAll() {
    console.log('clear all');
    const modalRef = this.ngModalService.open(ClearallWorkspaceModalComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    modalRef.result.then((result: any) => {
      if (result.search('clear all') != -1) {
        console.log('clear all');
        // TODO: update project lists
      }
    });
  }
  async calculate() {
    this.spinnerService.show();
    this.loadData();
    this.funnelData = [];
    this.loadFunnelData();
    this.spinnerService.hide();
  }

  save() {
    console.log('request save project: ' + JSON.stringify(this.objSelect));
    const modalRef = this.ngModalService.open(SaveWorkspaceModalComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.data = this.objSelect;
    modalRef.componentInstance.InitialProjectName = this.projectNameDisplay;
    modalRef.result.then((result: any) => {
      if (result.search('save-success') != -1) {
        console.log('save success');
      } else if (result.search('cancel save') != -1) {
        console.log('cancel save');
      } else if (result.search('can not get project id') != -1) {
        console.log('can not get project id');
      } else if (result.search('cancel replace') != -1) {
        console.log('cancel replace');
      }
    });
  }

  filterCube: any = [
    {
      feature: 'gender',
      query: {
        measures: ['INSHealth.count'],
        // dimensions: ['INSHealth.gender'],
        filters: [
          {
            member: 'INSHealth.gender',
            operator: 'equals',
            values: ['Female', 'Male'],
          },
        ],
      },
    },
    {
      feature: 'ageGroup',
      query: {
        measures: ['INSHealth.count'],
        // dimensions: ['INSHealth.ageGroup'],
        filters: [
          {
            member: 'INSHealth.ageGroup',
            operator: 'equals',
            values: ['23-25', '26-30', '31-35'],
          },
        ],
      },
    },
    {
      feature: 'lifeStage',
      query: {
        measures: ['INSHealth.count'],
        // dimensions: ['INSHealth.lifeStage'],
        filters: [
          {
            member: 'INSHealth.lifeStage',
            operator: 'equals',
            values: ['Student', 'Growing  Family', 'Supporting Family'],
          },
        ],
      },
    },
  ];

  funnel: any = [
    {
      titel: 'Gender',
      query: {
        measures: ['INSHealth.count'],
        dimensions: ['INSHealth.job'],
        order: {
          'INSHealth.count': 'desc',
        },
        filters: [
          {
            member: 'INSHealth.ageGroup',
            operator: 'equals',
            values: ['17-22', '23-25', '26-30'],
          },
          {
            member: 'INSHealth.gender',
            operator: 'equals',
            values: ['Female'],
          },
          {
            member: 'INSHealth.job',
            operator: 'notEquals',
            values: ['Rider'],
          },
        ],
      },
      // {
      //   measures: ['INSAsset.count'],
      //   dimensions: ['INSAsset.gender'],
      //   filters: [
      //     {
      //       member: 'INSAsset.gender',
      //       operator: 'equals',
      //       values: ['Female', 'Male'],
      //     },
      //   ],
      // },
    },
    // {
    //   title: 'Gender',
    //   query: {
    //     "measures": [
    //       "INSAsset.count"
    //     ],
    //     "order": {
    //       "INSAsset.dateCol": "asc"
    //     },
    //     "filters": [
    //       {
    //         "member": "INSAsset.gender",
    //         "operator": "equals",
    //         "values": [
    //           "Female"
    //         ]
    //       }
    //     ]
    //   },
    // },
    // {
    //   title: 'Net Worth',
    //   query: {
    //     "measures": [
    //       "INSHealth.count"
    //     ],
    //     "filters": [
    //       {
    //         "member": "INSHealth.affluencyScore",
    //         "operator": "gte",
    //         "values": [
    //           "0.03"
    //         ]
    //       },
    //       {
    //         "member": "INSHealth.affluencyScore",
    //         "operator": "lte",
    //         "values": [
    //           "0.08"
    //         ]
    //       }
    //     ]
    //   }
    //   ,
    // },
    // {
    //   title: "",
    //   query: {
    //     "measures": [
    //       "INSHealth.count"
    //     ],
    //     "filters": [
    //      {
    //         "member": "INSHealth.ageGroup",
    //         "operator": "equals",
    //         "values": [
    //           "17-22",
    //           "23-25",
    //           "26-30",
    //         ]
    //       },
    //       {
    //         "member": "INSHealth.gender",
    //         "operator": "equals",
    //         "values": [
    //           "Female"
    //         ]
    //       }
    //     ]
    //   }
    // }
  ];

  funnelQuery: any = [
    {
      measures: ['INSHealth.count'],
      dimensions: ['INSHealth.gender'],
      filters: [
        {
          member: 'INSHealth.gender',
          operator: 'equals',
          values: ['Female', 'Male'],
        },
      ],
    },
    {
      measures: ['INSHealth.count'],
      dimensions: ['INSHealth.ageGroup'],
      filters: [
        {
          member: 'INSHealth.gender',
          operator: 'equals',
          values: ['Female', 'Male'],
        },
        {
          member: 'INSHealth.ageGroup',
          operator: 'equals',
          values: ['23-25', '26-30', '31-35'],
        },
      ],
    },
    {
      measures: ['INSHealth.count'],
      dimensions: ['INSHealth.lifeStage'],
      filters: [
        {
          member: 'INSHealth.gender',
          operator: 'equals',
          values: ['Female', 'Male'],
        },
        {
          member: 'INSHealth.ageGroup',
          operator: 'equals',
          values: ['23-25', '26-30', '31-35'],
        },
        {
          member: 'INSHealth.lifeStage',
          operator: 'equals',
          values: ['Student', 'Growing  Family', 'Supporting Family'],
        },
      ],
    },
    {
      measures: ['INSHealth.count'],
      dimensions: ['INSHealth.job'],
      filters: [
        {
          member: 'INSHealth.gender',
          operator: 'equals',
          values: ['Female', 'Male'],
        },
        {
          member: 'INSHealth.ageGroup',
          operator: 'equals',
          values: ['23-25', '26-30', '31-35'],
        },
        {
          member: 'INSHealth.lifeStage',
          operator: 'equals',
          values: ['Student', 'Growing  Family', 'Supporting Family'],
        },
        {
          member: 'INSHealth.job',
          operator: 'notEquals',
          values: ['Rider'],
        },
      ],
    },
    {
      measures: ['INSHealth.count'],
      dimensions: ['INSHealth.affluencyScore'],
      filters: [
        {
          member: 'INSHealth.gender',
          operator: 'equals',
          values: ['Female', 'Male'],
        },
        {
          member: 'INSHealth.ageGroup',
          operator: 'equals',
          values: ['23-25', '26-30', '31-35'],
        },
        {
          member: 'INSHealth.lifeStage',
          operator: 'equals',
          values: ['Student', 'Growing  Family', 'Supporting Family'],
        },
        {
          member: 'INSHealth.job',
          operator: 'notEquals',
          values: ['Rider'],
        },
        {
          member: 'INSHealth.affluencyScore',
          operator: 'gte',
          values: ['0.05'],
        },
        {
          member: 'INSHealth.affluencyScore',
          operator: 'lte',
          values: ['0.1'],
        },
      ],
    },
  ];

  createFilterCube() {
    // this.filterCubeObj = [];
    // console.log('obj for create cube: ' + JSON.stringify(this.objSelect));
    // if(this.objSelect) {
    //   for(let item of this.objSelect.feature) {
    //   }
    // }
  }

  loadData() {
    var featureName: any = [];
    this.filterCube.forEach((data: any, index: any) => {
      // cubeResponse = { feature: data.feature };
      featureName.push(data.feature);
      this.cubeService
        .cubeApi()
        .load(data.query)
        .then((resultSet: any) => {
          //console.log(`===load data query===: ${JSON.stringify(resultSet)}`);
          // const resultData = resultSet.loadResponse.results[0].data;
          const resultData: IResult = resultSet.loadResponse.results[0];

          // console.log(
          //   `=====resultData response : ${JSON.stringify(resultData)}`
          // );
          // console.log(
          //   `============count :${Object.values(resultData.data[0])}`
          // );

          // featureName.forEach((fname: any, index: any) => {
          //   if (resultData.query.filters[0].member.includes(fname)) {
          //     let sum = Object.values(resultData.data[0]);
          //     let responseItem: IDataFilter = {
          //       feature: fname,
          //       sum: parseInt(sum[0]),
          //     };
          //     this.cubeResponse.push(responseItem);
          //   }
          // });

          // console.log(
          //   `======cube response : ${JSON.stringify(this.cubeResponse)}`
          // );
          this.mappingDataCode(resultData);
        });
    });
  }

  mappingDataCode(resultData: IResult) {
    // cubeResponseData: IDataFilter[],
    let nameCubeList: any = resultData.query.filters.filter((e) => {
      return e.member;
    });
    let count: any = Object.values(resultData.data[0]);
    let nameCubeFormat: string = nameCubeList[0].member;
    let nameCube = nameCubeFormat.split('.')[1];
    console.log('cube name: ' + nameCube + ' count: ' + count);
    let featureMap = this.dataMapping.filter((e) => {
      return e.dataCube.toLowerCase() === nameCube.toLowerCase();
    });
    console.log(featureMap);
    this.cubeResponse.push({
      feature: featureMap[0].dataCode,
      sum: Number(count),
    });

    console.log('cube response : ' + JSON.stringify(this.cubeResponse));
  }

  loadFunnelData() {
    this.funnelQuery.forEach((data: any, index: any) => {
      this.cubeService
        .cubeApi()
        .load(data)
        .then((resultSet: any) => {
          console.log(`Data Response: ${JSON.stringify(resultSet)}`);
          const resultResponse: IResult = resultSet.loadResponse.results[0];
          console.log(
            `resultResponse response : ${JSON.stringify(resultResponse)}`
          );

          const nameCube = resultResponse.query.dimensions[0].split('.')[1];
          let featureMap = this.dataMapping.filter((e) => {
            return e.dataCube.toLowerCase() === nameCube.toLowerCase();
          });

          var dataMapping: any[] = [];
          const dataResponse = resultResponse.data;
          dataResponse.forEach((e) => {
            let keyArr = Object.values(e);
            let newData = {
              item: keyArr[0],
              value: keyArr[1],
            };
            dataMapping.push(newData);
          });
          console.log(`dataMapping : ${JSON.stringify(dataMapping)}`);

          this.funnelData.push({
            feature: featureMap[0].dataCode,
            data: dataMapping,
            sum: this.sumDataFunnel(dataMapping),
          });
          this.funnelData?.sort((a, b) => {
            return b.sum - a.sum;
          });
          // console.log(`FunnelDatalist : ${JSON.stringify(this.funnelData)}`);
          console.log(
            `UniqueCustomer cal :${
              this.funnelData[this.funnelData.length - 1].sum
            }`
          );
          this.UniqueCustomer = this.funnelData[this.funnelData.length - 1].sum;
        });
      });
    console.log(`FunnelDatalist : ${JSON.stringify(this.funnelData.length)}`);
  }

  sumDataFunnel(data: any) {
    var sum: number = 0;
    data.forEach((e: any) => {
      sum += e.value;
    });
    return sum;
  }
}
