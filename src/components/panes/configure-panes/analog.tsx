import {FC, useState, useEffect} from 'react';
import {Detail, Label, ControlRow, SpanOverflowCell} from '../grid';
import {CenterPane} from '../pane';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {PelpiKeycodeInput} from 'src/components/inputs/pelpi/keycode-input';
import {getSelectedKeyDefinitions} from 'src/store/definitionsSlice';
import {
  getSelectedKey,
  getSelectedKeymap,
  getSelectedLayerIndex,
  updateKey,
} from 'src/store/keymapSlice';
import type {VIAKey} from '@the-via/reader';
import {
  getSelectedConnectedDevice,
  getSelectedKeyboardAPI,
} from 'src/store/devicesSlice';
import {KeyboardAPI} from 'src/utils/keyboard-api';
import {ErrorMessage} from 'src/components/styled';
