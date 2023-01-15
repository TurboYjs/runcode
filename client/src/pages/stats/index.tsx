import { useEffect, useState } from 'react';
import styles from './index.module.less';
import { getStat, Stat } from './service';
import dayjs from 'dayjs';
import { Chart, Util } from '@antv/g2';
import DataSet from '@antv/data-set';
import Select from '~components/Select';

enum RegionType {
  country,
  province,
  city,
}

function Component() {
  const [stats, setStats] = useState<Stat>({
    stats: { pv: 0, uv: 0 },
    os: [],
    uv: [],
    province: [],
    city: [],
    country: [],
    source: [],
    channel: [],
  });

  const [regionType, setRegionType] = useState(RegionType.country);

  const fetchStat = async () => {
    const startAt = dayjs(dayjs().format('YYYY-MM-DD') + ' 00:00:00').format(
      'YYYY-MM-DD HH:mm:ss'
    );
    const endAt = dayjs(dayjs().format('YYYY-MM-DD') + ' 23:59:59').format(
      'YYYY-MM-DD HH:mm:ss'
    );
    const stats = await getStat({ startAt, endAt });
    setStats(stats);
  };
  useEffect(() => {
    fetchStat();
  }, []);

  useEffect(() => {
    const data = stats.os || [];

    if (!data.length) return;

    const chart = new Chart({
      container: 'os-stats',
      autoFit: true,
      height: 360,
    });
    chart.data(data);

    chart.coordinate('theta', {
      radius: 0.75,
    });

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });

    chart
      .interval()
      .position('value')
      .color('type', [
        '#873bf4',
        '#063d8a',
        '#1770d6',
        '#47abfc',
        '#38c060',
        'rgb(255, 112, 8)',
      ])
      .label('value', {
        layout: [
          { type: 'pie-spider' },
          {
            type: 'limit-in-plot',
            cfg: { action: 'ellipsis' /** 或 translate */ },
          },
        ],
        content: (data) => {
          return `${data.type}: ${data.value}`;
        },
      })
      .adjust('stack');

    chart.interaction('element-single-selected');

    chart.render();

    return () => {
      chart.destroy();
    };
  }, [stats]);

  useEffect(() => {
    const data = stats.uv || [];

    if (!data.length) return;

    const ds = new DataSet();

    const chart = new Chart({
      container: 'uv-stats',
      autoFit: true,
      height: 360,
      syncViewPadding: true,
    });

    chart.scale({
      value: {
        sync: true,
        nice: true,
      },
    });

    const dv1 = ds.createView().source(data);
    dv1.transform({
      type: 'map',
      callback: (row) => {
        row.value = row.value;
        row.date = row.date;
        return row;
      },
    });
    const view1 = chart.createView();
    view1.data(dv1.rows);
    view1.axis('date', {});
    view1.axis('value', {
      title: {
        text: 'UA',
      },
    });
    view1.line().position('date*value');

    chart.render();
    return () => {
      chart.destroy();
    };
  }, [stats]);

  useEffect(() => {
    let data = stats.channel;

    const chart = new Chart({
      container: 'channel-stats',
      autoFit: true,
      height: 360,
    });

    chart.coordinate('theta', {
      radius: 0.75,
    });

    chart.data(data);

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });

    chart
      .interval()
      .position('value')
      .color('type', [
        '#873bf4',
        '#47abfc',
        '#38c060',
        '#1770d6',
        'rgb(255, 112, 8)',
      ])
      .label('value', {
        layout: [
          { type: 'pie-spider' },
          {
            type: 'limit-in-plot',
            cfg: { action: 'ellipsis' /** 或 translate */ },
          },
        ],
        content: (data) => {
          return `${data.type}: ${data.value}`;
        },
      })
      .adjust('stack');

    chart.interaction('element-single-selected');

    chart.render();
    return () => {
      chart.destroy();
    };
  }, [stats]);

  useEffect(() => {
    let data: any = [];

    if (regionType === RegionType.country) {
      data = stats.country || [];
    } else if (regionType === RegionType.province) {
      data = stats.province || [];
    } else {
      data = stats.city || [];
    }

    const chart = new Chart({
      container: 'region-stats',
      autoFit: true,
      height: 360,
    });

    chart.coordinate('theta', {
      radius: 0.75,
    });

    chart.data(data);

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });

    chart
      .interval()
      .position('value')
      .color('type')
      .label('value', {
        layout: [
          { type: 'pie-spider' },
          {
            type: 'limit-in-plot',
            cfg: { action: 'ellipsis' /** 或 translate */ },
          },
        ],
        content: (data) => {
          return `${data.type}: ${data.value}`;
        },
      })
      .adjust('stack');

    chart.interaction('element-single-selected');

    chart.render();
    return () => {
      chart.destroy();
    };
  }, [stats, regionType]);

  useEffect(() => {
    const data = stats.source || [];

    if (!data.length) return;

    const chart = new Chart({
      container: 'source-stats',
      autoFit: true,
      height: 360,
    });
    chart.data(data);

    chart.coordinate('theta', {
      radius: 0.75,
    });

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });

    chart
      .interval()
      .position('value')
      .color('type', [
        '#873bf4',
        '#063d8a',
        '#1770d6',
        '#47abfc',
        '#38c060',
        'rgb(255, 112, 8)',
      ])
      .label('value', {
        layout: [
          { type: 'pie-spider' },
          {
            type: 'limit-in-plot',
            cfg: { action: 'ellipsis' /** 或 translate */ },
          },
        ],
        content: (data) => {
          return `${data.type}: ${data.value}`;
        },
      })
      .adjust('stack');

    chart.interaction('element-single-selected');

    chart.render();

    return () => {
      chart.destroy();
    };
  }, [stats]);

  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <div className="stats shadow">
          <div className="stat w-36">
            <div className="stat-title">PV</div>
            <div className="stat-value">{stats.stats.pv}</div>
          </div>
        </div>
        <div className="stats shadow ml-5">
          <div className="stat w-36">
            <div className="stat-title">UV</div>
            <div className="stat-value">{stats.stats.uv}</div>
          </div>
        </div>
      </div>
      <div className={styles.chart}>
        <div className="w-1/2">
          <div className="mb-3">UA</div>
          <div id="os-stats"></div>
        </div>

        <div className="w-1/2">
          <div className="mb-3">PV nearly three days</div>
          <div id="uv-stats"></div>
        </div>
      </div>
      <div className={styles.chart}>
        <div className="w-1/2">
          <div className="mb-3">RA</div>
          <Select<RegionType>
            size="sm"
            options={[
              { label: 'Country', value: RegionType.country },
              { label: 'Province', value: RegionType.province },
              { label: 'City', value: RegionType.city },
            ]}
            value={regionType}
            onChange={(e) => {
              setRegionType(e);
            }}
          />
          <div id="region-stats"></div>
        </div>
        <div className="w-1/2">
          <div className="mb-3">Channels today</div>
          <div id="channel-stats"></div>
        </div>
      </div>
      <div className={styles.chart}>
        <div className="w-1/2">
          <div className="mb-3">Unknown channels referrer </div>
          <div id="source-stats"></div>
        </div>

        <div className="w-1/2"></div>
      </div>
    </div>
  );
}

export default Component;
