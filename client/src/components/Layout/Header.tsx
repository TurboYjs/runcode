import classNames from 'classnames';
import useLocation from 'react-use/lib/useLocation';
import Iconfont from '../Iconfont';
import Menu from '../Menu';
import router, { RouterPath } from '~pages/router';
import Tooltip from '~components/Tooltip';
import styles from './header.module.less';

export const settingDrawerId = 'editor-setting';

function Component() {
  let location = useLocation();
  const { pathname } = location;

  return (
    <div className={classNames('navbar bg-base-100', styles.container)}>
      <div className="flex-1">
        <a
          className="btn btn-ghost normal-case text-xl"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Runcode
        </a>
      </div>
      <div className="flex-none pr-4">
        <Menu
          value={pathname}
          options={[
            { label: 'Questions', value: RouterPath.questions },
            { label: 'Editor', value: RouterPath.editor },
            { label: 'Statics', value: RouterPath.stat },
          ]}
          onClick={(pathname) => {
            router.navigate(pathname);
          }}
          className="mr-4"
        />

        <div>
          <Tooltip tips="Feedback" position="bottom">
            <Iconfont
              name="yijianfankui"
              size={26}
              className={classNames('w-7 mr-3')}
              onClick={() => {
                window.open(
                  'https://github.com/turboyjs/runcode/issues/new',
                  '_blank'
                );
              }}
            />
          </Tooltip>
          <Tooltip tips="Github" position="bottom">
            <Iconfont
              name="github"
              size={24}
              className={classNames('w-7 mr-3')}
              onClick={() => {
                window.open('https://github.com/turboyjs/runcode', '_blank');
              }}
            />
          </Tooltip>

          <Tooltip tips="Settings" position="bottom">
            <label htmlFor={settingDrawerId}>
              <Iconfont
                name="setting"
                size={24}
                className={classNames('w-7')}
              />
            </label>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Component;
