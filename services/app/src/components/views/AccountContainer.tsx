import {connect} from 'react-redux';
import Redux from 'redux';
import {Quest} from 'shared/schema/Quests';
import {toPrevious} from '../../actions/Card';
import {previewQuest} from '../../actions/Quest';
import {getUserBadges, getUserFeedBacks} from '../../actions/User';
import {NAV_CARDS} from '../../Constants';
import {AppState, CardName} from '../../reducers/StateTypes';
import Account, {IDispatchProps, IStateProps} from './Account';
import {ParserNode} from './quest/cardtemplates/TemplateTypes';

const mapStateToProps = (state: AppState): IStateProps => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>): IDispatchProps =>  ({
  getUserFeedBacks: () => dispatch(getUserFeedBacks()),
  getUserBadges: () => dispatch(getUserBadges()),
  onReturn: () => {
    dispatch(toPrevious({
      matchFn: (c: CardName, n: ParserNode) => NAV_CARDS.indexOf(c) === -1,
    }));
  },
  onQuestSelect(quest: Quest): void {
    dispatch(previewQuest({quest}));
  },
});

const AccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);

export default AccountContainer;
