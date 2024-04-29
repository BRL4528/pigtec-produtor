import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.GRAY_400};
  padding: 15px;
  border-radius: 6px;
  min-width: 100%;
  margin-bottom: 15px;
`;

export const Text = styled.Text`
 /* margin-left: 10px; */
 color: #d7d7d8;
 margin-top: 10px;
 font-size: 16px;
`;
export const TextNick = styled.Text`
 /* margin-left: 10px; */
 color: #d7d7d8;
 margin: 10px;
 font-size: 14px;
`;

export const Title = styled.Text`
 font-size: 18px;
 color: #d7d7d8;
 margin-left: 15px;
 margin-right: 15px;
`;

export const SectionHeader = styled.View`
  align-items: center;
  flex-direction: row;
  
`;
export const SectionBody = styled.View`
 margin-top: 20px;
 flex-direction: row;
`;
