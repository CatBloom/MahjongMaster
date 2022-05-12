import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Rules } from '../../shared/interfaces/rules';
import { PlayerDataset } from '../../shared/interfaces/player';
import { RulesService } from '../../shared/services/rules.service';
import { ResultService } from '../../shared/services/result.service';
import { PlayerResultWrapper } from 'src/app/shared/interfaces/result';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss'],
})
export class AddResultComponent implements OnInit, OnDestroy {
  players: PlayerDataset[] = [];
  tableColumns: string[] = [];
  tableData: PlayerResultWrapper[] = [];

  formGroup = new FormGroup({
    playerName1: new FormControl('', [Validators.required]),
    playerName2: new FormControl('', [Validators.required]),
    playerName3: new FormControl('', [Validators.required]),
    playerName4: new FormControl('', [Validators.required]),
    playerPoint1: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
    playerPoint2: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
    playerPoint3: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
    playerPoint4: new FormControl('', [Validators.required, Validators.pattern(/^[\d-]+$/)]),
    calcPoint1: new FormControl('', [Validators.required, Validators.pattern(/^[\d\-.]+$/)]),
    calcPoint2: new FormControl('', [Validators.required, Validators.pattern(/^[\d\-.]+$/)]),
    calcPoint3: new FormControl('', [Validators.required, Validators.pattern(/^[\d\-.]+$/)]),
    calcPoint4: new FormControl('', [Validators.required, Validators.pattern(/^[\d\-.]+$/)]),
  });

  // getter
  get playerName1() {
    return this.formGroup.get('playerName1') as FormControl;
  }
  get playerName2() {
    return this.formGroup.get('playerName2') as FormControl;
  }
  get playerName3() {
    return this.formGroup.get('playerName3') as FormControl;
  }
  get playerName4() {
    return this.formGroup.get('playerName4') as FormControl;
  }
  get playerPoint1() {
    return this.formGroup.get('playerPoint1') as FormControl;
  }
  get playerPoint2() {
    return this.formGroup.get('playerPoint2') as FormControl;
  }
  get playerPoint3() {
    return this.formGroup.get('playerPoint3') as FormControl;
  }
  get playerPoint4() {
    return this.formGroup.get('playerPoint4') as FormControl;
  }
  get calcPoint1() {
    return this.formGroup.get('calcPoint1') as FormControl;
  }
  get calcPoint2() {
    return this.formGroup.get('calcPoint2') as FormControl;
  }
  get calcPoint3() {
    return this.formGroup.get('calcPoint3') as FormControl;
  }
  get calcPoint4() {
    return this.formGroup.get('calcPoint4') as FormControl;
  }

  // 取得したルール
  rules: Rules = {
    radioGame: '',
    radioDora: '',
    radioTanyao: '',
    radioTime: '',
    inputStartPoint: 0,
    inputFinishPoint: 0,
    inputReturnPoint: 0,
    inputCalledPoint: 0,
    inputReachPoint: 0,
    inputDeposit: 0,
    inputPenalty1: 0,
    inputPenalty2: 0,
    inputPenalty3: 0,
    inputUma1: 0,
    inputUma2: 0,
    inputUma3: 0,
    inputUma4: 0,
  };

  private onDestroy$ = new Subject();

  constructor(
    private rulesService: RulesService,
    private resultService: ResultService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.getRules();
    this.pointSubscriptions();

    // sampleData
    this.players = [
      {
        leagueId: '01',
        playerId: '01',
        playerName: 'catBloom',
      },
      {
        leagueId: '01',
        playerId: '02',
        playerName: 'sample02',
      },
      {
        leagueId: '01',
        playerId: '03',
        playerName: 'sample03',
      },
      {
        leagueId: '01',
        playerId: '04',
        playerName: 'sample04',
      },
    ];

    this.tableColumns = ['result', 'createDate'];
    this.tableData = [
      {
        resultId: '0001',
        rank: 1,
        leagueId: '01',
        playerId: '01',
        playerName: 'catBloom',
        point: 40000,
        calcPoint: 40,
        createDate: new Date('Sat Apr 02 2022 22:00:00 GMT+0900 (日本標準時)'),
        group: 1,
        resultData: [
          {
            resultId: '0001',
            rank: 1,
            leagueId: '01',
            playerId: '01',
            playerName: 'catBloom',
            point: 40000,
            calcPoint: 40,
            createDate: new Date('2020/02/02'),
            group: 1,
          },
          {
            resultId: '0001',
            rank: 2,
            leagueId: '01',
            playerId: '02',
            playerName: 'sample02',
            point: 30000,
            calcPoint: 30,
            createDate: new Date('2020/02/02'),
            group: 1,
          },
          {
            resultId: '0001',
            rank: 3,
            leagueId: '01',
            playerId: '03',
            playerName: 'sample03',
            point: 20000,
            calcPoint: 20,
            createDate: new Date('2020/02/02'),
            group: 1,
          },
          {
            resultId: '0001',
            rank: 4,
            leagueId: '01',
            playerId: '04',
            playerName: 'sample04',
            point: 10000,
            calcPoint: 10,
            createDate: new Date('2020/02/02'),
            group: 1,
          },
        ],
      },
      {
        resultId: '0002',
        rank: 2,
        leagueId: '01',
        playerId: '01',
        playerName: 'catBloom',
        point: 20000,
        calcPoint: 30,
        createDate: new Date('Sat Apr 02 2022 23:00:00 GMT+0900 (日本標準時)'),
        group: 2,
        resultData: [
          {
            resultId: '0002',
            rank: 1,
            leagueId: '01',
            playerId: '04',
            playerName: 'sample04',
            point: 60000,
            calcPoint: 40,
            createDate: new Date('2020/02/03'),
            group: 2,
          },
          {
            resultId: '0002',
            rank: 2,
            leagueId: '01',
            playerId: '01',
            playerName: 'catBloom',
            point: 25000,
            calcPoint: 30,
            createDate: new Date('2020/02/03'),
            group: 2,
          },
          {
            resultId: '0002',
            rank: 3,
            leagueId: '01',
            playerId: '03',
            playerName: 'sample03',
            point: 20000,
            calcPoint: 20,
            createDate: new Date('2020/02/03'),
            group: 2,
          },
          {
            resultId: '0002',
            rank: 4,
            leagueId: '01',
            playerId: '02',
            playerName: 'sample02',
            point: -5000,
            calcPoint: 10,
            createDate: new Date('2020/02/03'),
            group: 2,
          },
        ],
      },
    ];
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private getRules() {
    const leagueId = this.activeRoute.snapshot.paramMap.get('league-id');
    if (!leagueId) {
      return;
    } else {
      this.rulesService.getRules(leagueId).subscribe((rules) => {
        this.rules = rules;
      });
    }
  }

  private pointCheck() {
    const point1 = Number(this.playerPoint1.value);
    const point2 = Number(this.playerPoint2.value);
    const point3 = Number(this.playerPoint3.value);
    const point4 = Number(this.playerPoint4.value);
    if (point1 + point2 + point3 + point4 === this.rules.inputStartPoint * 4) {
      console.log('ok');
      return true;
    } else {
      console.log('error');
      return false;
    }
  }

  private calcPoint(point: number, uma: number) {
    return (point - this.rules.inputReturnPoint) / 1000 + uma;
  }

  private pointSubscriptions() {
    // player1の点数を変換
    this.playerPoint1.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const point = Number(this.playerPoint1.value);
      const topPrize = ((this.rules.inputReturnPoint - this.rules.inputStartPoint) * 4) / 1000;
      const setPoint = this.calcPoint(point, this.rules.inputUma1) + topPrize;
      if (isNaN(setPoint)) {
        this.calcPoint1.setValue('');
      } else {
        this.calcPoint1.setValue(setPoint);
      }
    });
    // player2の点数を変換
    this.playerPoint2.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const point = Number(this.playerPoint2.value);
      const setPoint = this.calcPoint(point, this.rules.inputUma2);
      if (isNaN(setPoint)) {
        this.calcPoint2.setValue('');
      } else {
        this.calcPoint2.setValue(setPoint);
      }
    });
    // player3の点数を変換
    this.playerPoint3.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const point = Number(this.playerPoint3.value);
      const setPoint = this.calcPoint(point, this.rules.inputUma3);
      if (isNaN(setPoint)) {
        this.calcPoint3.setValue('');
      } else {
        this.calcPoint3.setValue(setPoint);
      }
    });
    // player4の点数を変換
    this.playerPoint4.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      const point = Number(this.playerPoint4.value);
      const setPoint = this.calcPoint(point, this.rules.inputUma4);
      if (isNaN(setPoint)) {
        this.calcPoint4.setValue('');
      } else {
        this.calcPoint4.setValue(setPoint);
      }
    });
  }
}
