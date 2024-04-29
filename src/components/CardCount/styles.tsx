import styled from "styled-components/native";

interface PropsText {
  size: string;
}
interface PropsCard {
  status: string;
}

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.GRAY_400};
  padding: 15px;
  border-radius: 6px;
  min-width: 100%;
  margin-bottom: 15px;
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  
`;

export const Text = styled.Text`
 margin-left: 10px;
 color: #d7d7d8;
 margin: 10px;
`;
export const TextItens = styled.Text`
 margin-left: 10px;
 color: #d7d7d8;
 margin: 5px;
`;
export const Title = styled.Text<PropsText>`
  font-size: ${props => props.size === 'md' ? ({ theme }) => theme.FONT_SIZE.MD : ({ theme }) => theme.FONT_SIZE.SM}px;

 color: #d7d7d8;
 margin-left: 5px;
 margin-right: 15px;
`;

export const SectionHeader = styled.View`
  align-items: center;
  flex-direction: column;
  /* border-radius : 1px;
  border-bottom-style: dashed;
  border-bottom-width: 1px;
  border-bottom-color: cyan; */
  margin-bottom: 25px;
`;
export const SectionBody = styled.View`
 /* margin-top: 10px; */
`;
export const CardStatus = styled.View<PropsCard>`
 align-items: center;
  flex-direction: row;
  background-color: ${props => props.status === 'finalized' ? ({ theme }) => theme.COLORS.GREEN_900 : props.status === 'happening' ? ({ theme }) => theme.COLORS.YELLOW_600 : ({ theme }) => theme.COLORS.BLUE_500};
  margin: 0;
  right: 15px;
  bottom: 5px;
  padding: 2px;
  max-width: 120px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`;
