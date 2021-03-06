import React, { FC } from 'react';
import PortalConsumer from './portalConsumer';
import PortalHost, { portal, PortalContext } from './portalHost';

const Portal: FC = props => {
  return (
    <PortalContext.Consumer>
      {methods => <PortalConsumer methods={methods}>{props.children}</PortalConsumer>}
    </PortalContext.Consumer>
  );
};

export default Object.assign(Portal, {
  Host: PortalHost,
  add: portal.add,
  remove: portal.remove,
});
