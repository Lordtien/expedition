import * as React from 'react';
import {TUTORIAL_QUESTS} from '../../Constants';
import {initialSettings} from '../../reducers/Settings';
import QuestListCard, {Props} from './QuestListCard';
import {Expansion} from 'shared/schema/Constants';
import {render} from 'app/Testing';
import {loggedOutUser} from 'shared/auth/UserState';

const HORROR_SUBSTR = "Horror";
const FUTURE_SUBSTR = "Future";

describe('QuestListCard', () => {
  function setup(overrides?: Partial<Props>) {
    const props: Props = {
      quests: TUTORIAL_QUESTS,
      settings: {...initialSettings},
      contentSets: new Set(),
      onQuestSelect: jasmine.createSpy('onQuestSelect'),
      onReturn: jasmine.createSpy('onReturn'),
      ...overrides,
    };
    const e = render(<QuestListCard {...(props as any as Props)} />);
    return {props, e};
  }

  test('Shows quests', () => {
    const text = setup({
      settings: initialSettings,
      contentSets: new Set([Expansion.horror, Expansion.future]),
      }).e.text();
    expect(text).toContain(HORROR_SUBSTR);
    expect(text).toContain(FUTURE_SUBSTR);
  });

  test('Filters out Horror quests if Horror disabled', () => {
    const text = setup({
      settings: initialSettings,
      contentSets: new Set([Expansion.future]),
    }).e.text();
    expect(text).toContain("Learning");
    expect(text).not.toContain(HORROR_SUBSTR);
  });

  test('Filters out Future quests if Future disabled', () => {
    const text = setup({
      settings: initialSettings,
      contentSets: new Set([Expansion.horror]),
    }).e.text();
    expect(text).toContain("Learning");
    expect(text).not.toContain(FUTURE_SUBSTR);
  });
});
