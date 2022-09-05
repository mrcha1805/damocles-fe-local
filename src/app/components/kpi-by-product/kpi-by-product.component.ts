import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kpi-by-product',
  templateUrl: './kpi-by-product.component.html',
  styleUrls: ['./kpi-by-product.component.scss'],
})
export class KpiByProductComponent implements OnInit {
  kpiList: any = [
    {
      name: 'Banking',
      image: '../../../../assets/icons/banking.svg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis accumsan lorem.',
      isSelected: false,
      data: [
        { value: 'Deposit', desc: '', isSelected: true },
        { value: 'Credit', desc: '', isSelected: false },
        { value: 'Investment', desc: '', isSelected: false },
      ],
    },
    {
      name: 'Insurance',
      image: '../../../../assets/icons/insurance.svg',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis accumsan lorem.',
      isSelected: false,
      data: [
        { value: 'Life', desc: '', isSelected: true },
        { value: 'Non - Life', desc: '', isSelected: false },
      ],
    },
  ];

  public isCollapsed = -1;
  public items = ['item 1', 'item 2', 'item 3'];

  constructor() {}

  ngOnInit(): void {}
}
