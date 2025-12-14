import { forwardRef } from 'react';
import { Gift } from '@/types';

interface GiftCardProps {
  gift: Gift;
}

// 브랜드별 색상 테마
const brandThemes: Record<
  string,
  { bg: string; header: string; accent: string; emoji: string }
> = {
  교촌치킨: {
    bg: '#FFF3E0',
    header: '#D84315',
    accent: '#FF5722',
    emoji: '🍗',
  },
  스타벅스: {
    bg: '#E8F5E9',
    header: '#1E3932',
    accent: '#00704A',
    emoji: '☕',
  },
  배달의민족: {
    bg: '#E3F2FD',
    header: '#2AC1BC',
    accent: '#2AC1BC',
    emoji: '🛵',
  },
  다이소: {
    bg: '#FFEBEE',
    header: '#E53935',
    accent: '#F44336',
    emoji: '🛒',
  },
  CU: {
    bg: '#F3E5F5',
    header: '#6A1B9A',
    accent: '#9C27B0',
    emoji: '🏪',
  },
  버거킹: {
    bg: '#FFF8E1',
    header: '#D84315',
    accent: '#FF6F00',
    emoji: '🍔',
  },
  투썸플레이스: {
    bg: '#FCE4EC',
    header: '#880E4F',
    accent: '#C2185B',
    emoji: '🍰',
  },
  올리브영: {
    bg: '#E8F5E9',
    header: '#2E7D32',
    accent: '#4CAF50',
    emoji: '💄',
  },
  CGV: {
    bg: '#FFEBEE',
    header: '#B71C1C',
    accent: '#E53935',
    emoji: '🎬',
  },
  네이버페이: {
    bg: '#E8F5E9',
    header: '#03C75A',
    accent: '#03C75A',
    emoji: '💳',
  },
};

const defaultTheme = {
  bg: '#FFF3E0',
  header: '#5D4037',
  accent: '#8D6E63',
  emoji: '🎁',
};

function getTheme(giftName: string) {
  for (const brand of Object.keys(brandThemes)) {
    if (giftName.includes(brand)) {
      return brandThemes[brand];
    }
  }
  return defaultTheme;
}

function generateSerialCode() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const time = now.toTimeString().slice(0, 8).replace(/:/g, '');
  return `RG-${date}-${time}`;
}

const GiftCard = forwardRef<HTMLDivElement, GiftCardProps>(({ gift }, ref) => {
  const theme = getTheme(gift.name);
  const serialCode = generateSerialCode();

  return (
    <div
      ref={ref}
      style={{
        width: '320px',
        backgroundColor: theme.bg,
        borderRadius: '20px',
        padding: '16px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* 상단 헤더 */}
      <div
        style={{
          backgroundColor: theme.header,
          borderRadius: '16px 16px 0 0',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '12px', color: '#FFFFFF', marginBottom: '4px' }}>
          🎁 선물이 도착했어요!
        </p>
        <h3
          style={{
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            margin: 0,
          }}
        >
          {gift.name}
        </h3>
      </div>

      {/* 메인 콘텐츠 */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '20px 16px',
        }}
      >
        {/* 이모지 아이콘 */}
        <div
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: theme.bg,
            borderRadius: '50%',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
          }}
        >
          {theme.emoji}
        </div>

        <p
          style={{
            fontSize: '14px',
            color: '#333333',
            textAlign: 'center',
            lineHeight: '1.6',
            marginBottom: '16px',
          }}
        >
          {gift.description}
        </p>

        {/* 태그 */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            justifyContent: 'center',
          }}
        >
          {gift.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 10px',
                backgroundColor: theme.bg,
                color: theme.header,
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '600',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 하단 바코드 영역 */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '0 0 16px 16px',
          padding: '12px 16px',
          borderTop: '2px dashed #E5E5E5',
        }}
      >
        {/* 바코드 모양 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2px',
            marginBottom: '8px',
          }}
        >
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              style={{
                width: i % 3 === 0 ? '3px' : '2px',
                height: '32px',
                backgroundColor: i % 5 === 0 ? theme.header : '#666666',
              }}
            />
          ))}
        </div>
        <p
          style={{
            fontSize: '10px',
            textAlign: 'center',
            color: '#999999',
            margin: 0,
          }}
        >
          {serialCode}
        </p>
      </div>

      {/* 하단 로고 */}
      <div
        style={{
          textAlign: 'center',
          paddingTop: '12px',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            color: theme.header,
            fontWeight: '600',
            margin: 0,
          }}
        >
          RANDOM GIFT 🎁
        </p>
      </div>
    </div>
  );
});

GiftCard.displayName = 'GiftCard';

export default GiftCard;
