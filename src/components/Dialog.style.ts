import styled, {css, keyframes} from 'styled-components';
import cross from '../images/cross.png';
import crossHover from '../images/cross-hover.png';

const fadeIn = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, .3);
  }
`;
const fadeOut = keyframes`
  from {
    background-color: rgba(0, 0, 0, .3);
  }
  to {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const scaleOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(.5);
    opacity: 0;
  }
`;

export const DialogBackground = styled.div<{ show?: boolean }>`
    animation: ${fadeIn} .3s linear;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
    ${({show}) => show ? '' : css`animation: ${fadeOut} .3s linear;`}
`;

export const DialogWrapper = styled.div<{ show?: boolean }>`
    animation: ${scaleIn} .5s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 20px 0 0 0;
    background: #eee;
    border-radius: 8px;
    border: solid 1px #666;
    box-shadow: 0 10px 30px rgba(0, 0, 0, .7);
    cursor: auto;
    ${({show}) => show ? '' : css`animation: ${scaleOut} .3s linear;`}
`;

export const DialogInner = styled.div`
    padding: 30px;
`;

export const TitleBar = styled.div`
    background-color: #ccc;
    border-width: 1px 0;
    border-style: solid;
    border-color: #666;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
`;

export const Title = styled.h3`
    color: #333;
    font-size: 14px;
    line-height: 14px;
    text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
    margin: 0 15px 0 0;
    padding: 0;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const BaseIconButton = styled.button`
    font-size: 0;
    line-height: 0;
    padding: 0;
    cursor: pointer;
    color: transparent;
    outline: none;
    border: solid 1px #666;
    background-position: -1px -1px;
    background-color: #ccc;
    :hover{
        background-color: #666;
    }
`;

export const SmallIconButton = styled(BaseIconButton)`
    border-radius: 4px;
    background-size: 16px 16px;
    height: 16px;
    width: 16px;
`;

export const LargeIconButton = styled(BaseIconButton)`
    width: 28px;
    height: 28px;
    background-size: 28px 28px;
    border-radius: 6px;
`;

export const Close = styled(SmallIconButton)`
    background-image: url(${cross});
    :hover{
        background-image: url(${crossHover});
    }
`;
