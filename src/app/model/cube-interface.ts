export interface ICubeResponse {
  loadResponse: LoadResponse;
  queryType: string;
  loadResponses: IResult[];
  options: FilterDimensionsSingleValueEqual;
  backwardCompatibleData: any[];
}

export interface LoadResponse {
  queryType: string;
  results: IResult[];
  pivotQuery: IQuery;
  slowQuery: boolean;
}

export interface IResult {
  query: IQuery;
  data: Datum[];
  lastRefreshTime: string;
  refreshKeyValues: any[];
  usedPreAggregations: UsedPreAggregations;
  transformedQuery: TransformedQuery;
  requestId: string;
  annotation: Annotation;
  dataSource: string;
  dbType: string;
  extDbType: string;
  external: boolean;
  slowQuery: boolean;
  total?: any;
}

interface Annotation {
  measures: Measures;
  dimensions: Dimensions;
  segments: FilterDimensionsSingleValueEqual;
  timeDimensions: FilterDimensionsSingleValueEqual;
}

interface Dimensions {
  'INSAsset.ageGroup': INSAssetageGroup;
}

interface INSAssetageGroup {
  title: string;
  shortTitle: string;
  type: string;
}

interface Measures {
  'INSAsset.count': INSAssetcount2;
}

export interface IDataFilter {
  feature: string;
  sum: number;
}

export interface IfunnelList {
  feature: string;
  data: any[];
  sum: number;
}

interface INSAssetcount2 {
  title: string;
  shortTitle: string;
  type: string;
  drillMembers: string[];
  drillMembersGrouped: DrillMembersGrouped;
}

interface DrillMembersGrouped {
  measures: any[];
  dimensions: string[];
}

interface TransformedQuery {
  sortedDimensions: string[];
  sortedTimeDimensions: any[];
  timeDimensions: any[];
  measures: string[];
  leafMeasureAdditive: boolean;
  leafMeasures: string[];
  measureToLeafMeasures: MeasureToLeafMeasures;
  hasNoTimeDimensionsWithoutGranularity: boolean;
  allFiltersWithinSelectedDimensions: boolean;
  isAdditive: boolean;
  granularityHierarchies: GranularityHierarchies;
  hasMultipliedMeasures: boolean;
  hasCumulativeMeasures: boolean;
  windowGranularity?: any;
  filterDimensionsSingleValueEqual: FilterDimensionsSingleValueEqual;
}

interface FilterDimensionsSingleValueEqual {}

interface GranularityHierarchies {
  year: string[];
  quarter: string[];
  month: string[];
  week: string[];
  day: string[];
  hour: string[];
  minute: string[];
  second: string[];
}

interface MeasureToLeafMeasures {
  'INSAsset.count': INSAssetcount[];
}

interface INSAssetcount {
  measure: string;
  additive: boolean;
  type: string;
}

interface UsedPreAggregations {
  'dev2_pre_aggregation.i_n_s_asset_main': Dev2preaggregationinsassetmain;
}

interface Dev2preaggregationinsassetmain {
  targetTableName: string;
  refreshKeyValues: any[];
  lastUpdatedAt: number;
}

interface Datum {
  'INSAsset.ageGroup': string;
  'INSAsset.count': number;
}

export interface IQuery {
  measures: string[];
  order?: Order[];
  dimensions: string[];
  timezone?: string;
  filters: FilterData[];
  timeDimensions?: any[];
  queryType?: string;
}

interface Order {
  id: string;
  desc: boolean;
}

export interface FilterData {
  operator: string;
  values: string[];
  member: string;
}
